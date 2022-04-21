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
const { PromiseProvider } = require('mongoose')
const Mentor = require('../models/mentor')

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

router.post('/updateProject',auth,async(req,res)=> {
    let newproj = await project.findByIdAndUpdate(req.body.projectID,req.body.update)
    console.log(newproj);
    res.send(newproj)
})

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

router.post('/sendInvite',auth, async(req,res)=> {
    let invitee = await studentUser.findOne({_id:req.body.user.id});
    const proj = await project.findOne({_id:req.body.projectID})

    let joinRequest = {
        isInvite:true,
        projID:req.body.projectID,
        id:req.body.user.id,
        appStatus: 'Invited',
        dateReceived: new Date()
    }


    proj.joinRequests.push(joinRequest)
    proj.markModified('joinRequests');
    await proj.save()

    invitee.joinRequests.push(joinRequest)
    invitee.markModified('joinRequests')
    console.log(invitee.joinRequests)
    await invitee.save()

    res.send('Worked..')
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
        jR!==req.body.application&&(jR.isInvite===true&&req.body.application.isInvite===true||jR.isInvite===false&&req.body.application.isInvite===false)
    })

    applicant.markModified('joinRequests');
    
    await applicant.save()     

    res.send(applicant.joinRequests)
})

router.post('/confirmRejectionInvite',auth, async(req,res)=> {
    const applicant = await studentUser.findOne({_id:req.user._id});
    applicant.joinRequests = applicant.joinRequests.filter(jR=> {
        return (
        jR!==req.body.application&&!((jR.isInvite===true&&req.body.application.isInvite===true)||(jR.isInvite===false&&req.body.application.isInvite===false))
        )
    })

    applicant.markModified('joinRequests');
    await applicant.save()     

    const proj = await project.findOne({_id:req.body.application.projID})
    proj.joinRequests = proj.joinRequests.filter(jR=> {
        return(
        jR!==req.body.application&&!((jR.isInvite===true&&req.body.application.isInvite===true)||(jR.isInvite===false&&req.body.application.isInvite===false))
        )
    })


    proj.markModified('joinRequests');
    await proj.save()


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

router.post('/getMentorsAdmin', async(req,res)=> {
    const mentors = await mentor.find({});
    res.send(mentors);
})

router.post('/checkAvailability', auth, async(req,res)=> {
    const projects = await project.find();
    const mentor = req.body.consultant;
    const date = req.body.date;
    let availability = true;


    for(let i = 0; i<projects.length;i++){
        for(let j = 0; j<projects[i].mentorshipPackages.length;j++){
            if(projects[i].mentorshipPackages[j].scheduleSelected&&JSON.stringify(projects[i].mentorshipPackages[j]._id)===JSON.stringify(mentor._id)){
                if(String(new Date(projects[i].mentorshipPackages[j].scheduleSelected)) === String(new Date(date)) ){
                    console.log('Date Taken')
                    availability = false
                }
            }
        }
    }


    res.send(availability);


})  


router.post('/getFirstFree', auth, async(req,res)=> {
    const proj = await project.findOne({_id:req.body.projectID})
    console.log(proj.isFirstFree)
    res.send(proj.isFirstFree)
})

router.post('/addMentorshipPackage', auth, async(req,res)=> {
    const proj = await project.findOne({_id:req.body.projectID})
    let isFirstTime = true;

    const noOfSessions = req.body.mentorshipPackage.numberOfSessions
    let newInfo = {...req.body.mentorshipPackage,numberOfSessionsRemaining:noOfSessions, isFirstFree:isFirstTime, paymentPending:true, pendingAmount:  req.body.mentorshipPackage.pricing[0]*(isFirstTime?noOfSessions-1:noOfSessions) , sessionScheduled: false}
    if(isFirstTime){
        newInfo = {...newInfo, individualTotalCost: newInfo.pendingAmount/proj.team.length}
    }
    proj.mentorshipPackages.push(newInfo)


    for(let i = 0; i<proj.team.length;i++) {
        if(proj.team[i].pendingPayments){
        proj.team[i].pendingPayments.push(req.body.mentorshipPackage.pricing[0]/parseFloat(proj.team.length)*(isFirstTime?noOfSessions-1:noOfSessions))
        }else {
            proj.team[i].pendingPayments = [req.body.mentorshipPackage.pricing[0]/parseFloat(proj.team.length)*(isFirstTime?noOfSessions-1:noOfSessions)]
        }


        const user = await studentUser.findById(proj.team[i].id);

        let paymentInfo = {
            amounts: [req.body.mentorshipPackage.pricing[0]/parseFloat(proj.team.length)*(isFirstTime?noOfSessions-1:noOfSessions)],
            totalAmountForThisProject:req.body.mentorshipPackage.pricing[0]/parseFloat(proj.team.length)*(isFirstTime?noOfSessions-1:noOfSessions),
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
            pendingPaymentObj.amounts.push(req.body.mentorshipPackage.pricing[0]/parseFloat(proj.team.length)*(isFirstTime?noOfSessions-1:noOfSessions))
            paymentInfo.amounts = pendingPaymentObj.amounts
            paymentInfo.totalAmountForThisProject = pendingPaymentObj.totalAmountForThisProject+req.body.mentorshipPackage.pricing[0]/parseFloat(proj.team.length)*(isFirstTime?noOfSessions-1:noOfSessions);
            user.pendingPayments[finI] = paymentInfo;
        }



        }else {
            user.pendingPayments = [paymentInfo]
        }

        user.markModified('pendingPayments');
        console.log(user.pendingPayments)
        await user.save()

    }


    proj.markModified('team');
    proj.markModified('mentorshipPackages');

    let newProj = await proj.save()

   
    res.send(newProj);
})

router.post('/cancelLatestMentorship',auth, async(req,res)=> {
    const proj = await project.findOne({_id:req.body.projectID});
    if(proj.mentorshipPackages[proj.mentorshipPackages.length-1].isFirstFree===true){
        proj.isFirstFree = true;
        proj.markModified('isFirstFree');
        await proj.save()
    }

    proj.mentorshipPackages = proj.mentorshipPackages.filter(pcage=> {
        return pcage !== proj.mentorshipPackages[proj.mentorshipPackages.length-1];
    })

    proj.markModified('mentorshipPackages');
    await proj.save()

    for(let i = 0; i<proj.team.length;i++){
        let costreduced = proj.team[i].pendingPayments.splice(proj.team[i].pendingPayments.length-1,1);
        proj.markModified('team')
        await proj.save()
        if(costreduced!==0){
            let id = proj.team[i].id;
            let user = await studentUser.findById(id);
            for(let k = 0;k<user.pendingPayments.length;k++){
                if(JSON.stringify(user.pendingPayments[k].projectID) === JSON.stringify(proj._id)){
                    user.pendingPayments[k].totalAmountForThisProject -= costreduced;
                    let dummy = user.pendingPayments[k].amounts.pop();
                }
            }
            user.markModified('pendingPayments');
            await user.save()
        }
    }

    res.send('Done Succesfully')

})

router.post('/getMentorshipPackages',auth,async(req,res)=> {
    const proj = await project.findOne({_id:req.body.projectID})
    res.send(proj.mentorshipPackages);
})

router.post('/getTeam', auth, async(req,res)=> {
    const proj = await project.findOne({_id:req.body.projectID})
    res.send(proj.team);
})

router.post('/finishLatestSession', auth, async(req,res)=> 
{
    const proj = await project.findOne({_id:req.body.projectID})
    mentorshipPackage = proj.mentorshipPackages[0];
    if(mentorshipPackage.numberOfSessionsRemaining===1){
        proj.mentorshipPackages.splice(0,1)
        proj.markModified('mentorshipPackages');
    await proj.save()
    let randamnt
        for(let i = 0;i<proj.team.length;i++){
            randamnt = proj.team[i].pendingPayments.splice(0,1);
        }
        proj.markModified('team');
        await proj.save()

    
    }else {
        proj.mentorshipPackages[0].numberOfSessionsRemaining -= 1;
        proj.mentorshipPackages[0].sessionScheduled = false;
        proj.mentorshipPackages[0].sessionConfirmed = false;
        proj.mentorshipPackages[0].sessionAccepted = false;
        proj.mentorshipPackages[0].sessionRequested = false;
        proj.mentorshipPackages[0].sessionLink = null;
        proj.mentorshipPackages[0].scheduleSelected = null;
        proj.markModified('mentorshipPackages');
    await proj.save()
    }
    
    res.send('Works')
})








module.exports = router
