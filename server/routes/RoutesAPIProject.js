const router = require('express').Router()
const nodemailer = require('nodemailer')
const studentUser = require('../models/studentUser')
const project = require('../models/project')
const mentor = require('../models/mentor')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const auth = require('../auth/auth')
const multer = require('multer')
const cloudinary = require('cloudinary')

const fileStorageEngine = multer.diskStorage({
    filename: function (req, file, callback) {
        callback(null, Date.now() + file.originalname)
    }
})
const upload = multer({ storage: fileStorageEngine })

router.post('/getQuestions',auth,async(req,res)=> {
    const proj = await project.findOne({_id: req.body.projectID});
    const application = proj.application?proj.application:[]
    res.send(application)
} )

router.post('/updateQuestions' , auth, async(req,res)=> {
    const proj = await project.findOne({_id: req.body.projectID});
    proj.application =req.body.questions
    proj.save();
    res.send(proj.application)
})

router.post('/updateAppStatus', auth, async(req,res)=> {
    const proj = await project.findOne({_id: req.body.projectID});
    proj.accepting = req.body.accepting;
    proj.save();
    res.send(proj.accepting)
})

router.post('/getProjUser',auth, async(req,res)=> {
    try {
        const user = await studentUser.findById(req.body.id)
        res.send(user)
    }catch (err) {
        res.status(400).send(err)
    }
})

router.post('/acceptApp',auth, async(req,res)=> {
    const applicant = await studentUser.findOne({_id:req.body.application.id});
    const proj = await project.findOne({_id:req.body.application.projID})

    for(let k = 0; k<applicant.joinRequests.length ; k++) {

        if(JSON.stringify(applicant.joinRequests[k]) === JSON.stringify(req.body.application)){
            applicant.joinRequests[k].appStatus = 'Accepted'
        }
    }

    for(let k = 0; k<proj.joinRequests.length ; k++) {
        if(JSON.stringify(proj.joinRequests[k]) === JSON.stringify(req.body.application)){
            proj.joinRequests[k].appStatus = 'Accepted'
        }
    }

    await applicant.markModified('joinRequests');
    await proj.markModified('joinRequests');

    await applicant.save()

    await proj.save()
     

    res.send(proj.joinRequests)
})

router.post('/confirmAcceptance',auth, async(req,res)=> {
    const applicant = await studentUser.findOne({_id:req.body.application.id});
    const proj = await project.findOne({_id:req.body.application.projID})
    let appObj = {
        id:applicant._id,
        name: applicant.firstName + ' ' + applicant.lastName,
        pic: applicant.profilePic,
        dateAdded: new Date()
    }

    proj.team.push(appObj)
    applicant.projects.push(proj._id)

    proj.joinRequests = proj.joinRequests.filter(jR=> {
        jR!==req.body.application
    })

    applicant.joinRequests = applicant.joinRequests.filter(jR=> {
        jR!==req.body.application
    })


    applicant.markModified('joinRequests');
    proj.markModified('joinRequests');
    
    await applicant.save()

    await proj.save()
     

    res.send(applicant.joinRequests)
})

router.post('/rejectApp',auth, async(req,res)=> {
    const applicant = await studentUser.findOne({_id:req.body.application.id});
    const proj = await project.findOne({_id:req.body.application.projID})
    let appObj = {
        id:applicant._id,
        name: applicant.firstName + ' ' + applicant.lastName,
        pic: applicant.profilePic
    }

    for(let k = 0; k<applicant.joinRequests.length ; k++) {
        if(JSON.stringify(applicant.joinRequests[k]) === JSON.stringify(req.body.application)){
            applicant.joinRequests[k].appStatus = 'Rejected'
        }
    }

    proj.joinRequests = proj.joinRequests.filter(jR=> {
        jR!==req.body.application
    })

    proj.markModified('joinRequests');
    applicant.markModified('joinRequests');

    await applicant.save()

    await proj.save()
     

    res.send(proj.joinRequests)
})

router.post('/confirmRejection',auth, async(req,res)=> {
    const applicant = await studentUser.findOne({_id:req.body.application.id});
    applicant.joinRequests = applicant.joinRequests.filter(jR=> {
        jR!==req.body.application
    })

    applicant.markModified('joinRequests');
    
    await applicant.save()     

    res.send(applicant.joinRequests)
})

router.post('/updateFeed',auth, async(req,res)=> {
    const proj = await project.findOne({_id:req.body.projectID})
    proj.messages = req.body.feed;
    let newProj = await proj.save()
    res.send(newProj.messages);
})

router.post('/uploadProjectFile',auth, async(req,res)=> {
    const proj = await project.findOne({_id:req.body.projectID})
    const user = await studentUser.findById(req.user._id)

    const upload = {...req.body.upload,uploadedBy:(user.firstName+ ' ' + user.lastName)};
    if(proj.documents){
        proj.documents.push(upload)
    }else {
        proj.documents = new Array(upload);
    }
    

    let newProj = await proj.save()
    console.log(upload)
    res.send(newProj.documents);
})

router.post('/getDocs',auth, async(req,res)=> {
    const proj = await project.findOne({_id:req.body.projectID})
    res.send(proj.documents)
})

router.post('/updateDocs',auth, async(req,res)=> {
    const proj = await project.findOne({_id:req.body.projectID})
    proj.documents = req.body.docs;
    proj.save();
    res.send(proj.documents)
})

router.post('/getTeamContacts',auth,async(req,res)=> {
    const proj = await project.findOne({_id: req.body.projectID});
    let contacts = [];
    for(let i = 0; i<proj.team.length;i++) {
        const user = await studentUser.findById(proj.team[i].id);
        contacts.push(user.email);
    }

    res.send(contacts)
})

router.post('/getMentors', auth, async(req,res)=> {
    const mentors = await mentor.find({});
    res.send(mentors);
})

router.post('/addMentorshipPackage', auth, async(req,res)=> {
    const proj = await project.findOne({_id:req.body.projectID})
    proj.mentorshipPackages.push({...req.body.mentorshipPackage,paymentPending:true, pendingAmount: req.body.mentorshipPackage.pricing[0] , scheduled: false})
    const noOfSessions = req.body.mentorshipPackage.numberOfSessions
    for(let i = 0; i<proj.team.length;i++) {
        if(proj.team[i].pendingPayments){
        proj.team[i].pendingPayments.push(req.body.mentorshipPackage.pricing[0]/parseFloat(proj.team.length)*req.body.mentorshipPackage.numberOfSessions)
        }else {
            proj.team[i].pendingPayments = [req.body.mentorshipPackage.pricing[0]/parseFloat(proj.team.length)*req.body.mentorshipPackage.numberOfSessions]
        }


        const user = await studentUser.findById(proj.team[i].id);

        let paymentInfo = {
            amounts: [req.body.mentorshipPackage.pricing[0]/parseFloat(proj.team.length)*req.body.mentorshipPackage.numberOfSessions],
            totalAmountForThisProject:req.body.mentorshipPackage.pricing[0]/parseFloat(proj.team.length)*req.body.mentorshipPackage.numberOfSessions,
            projectID: req.body.projectID,
            projectName: proj.name,
    }

       
        if(user.pendingPayments){

        let chk = false;
        let finI = 0;

        for(let i = 0; i<user.pendingPayments.length;i++){
            if(JSON.stringify(user.pendingPayments[i].projectID) === JSON.stringify(req.body.projectID)){
                chk = true;
                finI = i;
                break;
            }
        }


        if(!chk){
            user.pendingPayments.push(paymentInfo)
        } else {
            let pendingPaymentObj = user.pendingPayments[finI]
            paymentInfo.amounts = pendingPaymentObj.amounts.push(req.body.mentorshipPackage.pricing[0]/parseFloat(proj.team.length)*req.body.mentorshipPackage.numberOfSessions)
            paymentInfo.totalAmountForThisProject = pendingPaymentObj.totalAmountForThisProject+req.body.mentorshipPackage.pricing[0]/parseFloat(proj.team.length)*req.body.mentorshipPackage.numberOfSessions;
            user.pendingPayments.push(paymentInfo)
        }



        }else {
            user.pendingPayments = [paymentInfo]
        }

        user.markModified('pendingPayments');
        await user.save()

    }

    proj.markModified('team');
    proj.markModified('mentorshipPackages');

    let newProj = await proj.save()

    res.send(newProj);
})

router.post('/getMentorshipPackages',auth,async(req,res)=> {
    const proj = await project.findOne({_id:req.body.projectID})
    res.send(proj.mentorshipPackages);
})

router.post('/getTeam', auth, async(req,res)=> {
    const proj = await project.findOne({_id:req.body.projectID})
    res.send(proj.team);
})








module.exports = router
