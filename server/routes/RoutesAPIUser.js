const router = require('express').Router()
const nodemailer = require('nodemailer')
const studentUser = require('../models/studentUser')
const project = require('../models/project')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const auth = require('../auth/auth')
const multer = require('multer')
const cloudinary = require('cloudinary')
const Mentor = require('../models/mentor')

const fileStorageEngine = multer.diskStorage({
    filename: function (req, file, callback) {
        callback(null, Date.now() + file.originalname)
    }
})
const upload = multer({ storage: fileStorageEngine })


router.post('/sendUserQuery',(req,res)=> {
        async function sendMail(){
        try {
            const transport = await nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'ideastackapp@gmail.com',
                    pass: process.env.PASS
                } 
            })
        
            const mailOptions = {
                from:'IdeaStack™ <ideastackapp@gmail.com>',
                to: [req.body.mailId],
                bcc:['vismaysuramwar@gmail.com'],
                subject:'Contacting IdeaStack™',
                text:`
                Hey ${req.body.name} !
        
                Your message has been noted.
                Message: ${req.body.message}.
                We'll get back to you as soon as possible!
                
                Best Regards,
                Outreach, IdeaStack™`,
                html: `
                <p>Hey ${req.body.name}!</p>
        
                <p>Your message has been noted.<br/>
                <h4>Message: "${req.body.message}".</h4>
                Thank you for showing interest in IdeaStack™.<br/> 
                We'll get back to you as soon as possible!</p>
                
                <p>Best Regards,<br/>
                Outreach team, IdeaStack™</p>
                <br/><br/>
                <img style = "width:152px; position:relative; margin:auto;" src="cid:ideastack@orgae.ee"/>
                `,
                attachments:[
                    {
                      fileName: 'IdeaStack.jpg',
                      path: 'server/routes/IdeaStack.jpg',
                      cid: 'ideastack@orgae.ee'
                    }
                  ]
            }
            const result = await transport.sendMail(mailOptions)
            return result
        }catch (err) {
            return(err)
        }
        } 
        sendMail().then(result=> {
            console.log(result)
        }).catch(err=> {
            console.log(err)
        })
        res.send('Successfully sent Email !')
})

//receives user data and registers user in database
//sends back user and token.
router.post('/register', async(req,res)=> {
    console.log(req.body)
    try {
        let hash = await bcrypt.hash(req.body.password.trim(), 10)
        let existingUser = await studentUser.findOne({email: req.body.email.trim()})
        if(existingUser) {
            res.status(400).send('This Email ID has already been registered.')
        } else {
            const newUser = new studentUser({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email.toLowerCase().trim(),
                password: hash,
                school: req.body.school,
                country: req.body.country,
                age: req.body.age,
                city: req.body.city
            })
            const user = await newUser.save()
            const token = jwt.sign({_id:user._id}, 
                process.env.TOKEN_SECRET,
                {expiresIn:'2.5h'});
             console.log('- Logged In')
             res.send({user:user, userToken: token}) 
        }
        
    }catch (err) {
        res.status(400).send(err)
    }
})

router.post('/checkCookie',async(req,res)=> {
    try {
        const users = await studentUser.find();
        let chk = false;
        for(let i =0;i<users.length;i++){
            const decoded = await jwt.verify(req.body.cookieString, process.env.TOKEN_SECRET);
            const isMatch = JSON.stringify(users[i]._id) === JSON.stringify(decoded._id)
            if(isMatch) {
                let user = users[i];
                const token = jwt.sign({_id:user._id}, 
                    process.env.TOKEN_SECRET,
                    {expiresIn:'2.5h'});
                    console.log('- Logged In')
                    chk = true;
                    res.send({user:user, userToken: token, isValid:true})
            }
        }
        if(!chk){res.send('Invalid Cookie')}
    }catch (err) {
        console.log(err)
        res.status(400).send(err)
    }
})


router.post('/login',   
  async(req,res)=> {
    try {
        const user = await studentUser.findOne({email:req.body.email.toLowerCase().trim()})
        if(!user) {
            console.log('- User not found')
            res.status(401) .send('User not found')
        }else {
            const isMatch = await bcrypt.compare(req.body.password.trim(), user.password)
            if(!isMatch) {
                console.log('- Incorrect password')
                res.status(401).send('Incorrect password')
            }else {
                const token = jwt.sign({_id:user._id}, 
                    process.env.TOKEN_SECRET,
                    {expiresIn:'2.5h'});

                    const token2 = jwt.sign({_id:user._id}, 
                        process.env.TOKEN_SECRET,
                        {expiresIn:'14d'});


                console.log('- Logged In')

                if(!req.body.rememberme){
                    let cookieNow = req.session.cookie
                cookieNow.path = 'www.ideastack.org/home'
                cookieNow.id = token2
                cookieNow.expires = new Date(Date.now() + 900000)
                req.session.isAuth = true
                res.send({user:user, userToken: token, cookieObj:{...cookieNow,
                    id:token2,
                    expires: new Date(Date.now() + 900000)    
                }})
                }else {
                    res.send({user:user, userToken: token})
                }
            }
        }
    }catch (err) {
        console.log(err)
    }
})


router.post('/sendResetCode',async(req,res)=> {
    console.log(req.body.mail.trim())
        const user = await studentUser.findOne({email:req.body.mail.toLowerCase().trim()})
        if(!user) {
            console.log('- User not found')
            res.status(401).send('User Email ID not found')
        }else {
            async function sendMail(){
                try {
                    const transport = await nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: 'ideastackapp@gmail.com',
                            pass: process.env.PASS
                        } 
                    })
                
                    const mailOptions = {
                        from:'IdeaStack™ <ideastackapp@gmail.com>',
                        to: [user.email],
                        bcc:['vismaysuramwar@gmail.com'],
                        subject:'Password Reset',
                        text:`
                        Hey ${user.firstName},
                
                        Your message has been noted.
                        Message: ${req.body.message}.
                        We'll get back to you as soon as possible!
                        
                        Best Regards,
                        Outreach, IdeaStack™`,
                        html: `
                        <p>Hey ${user.firstName}!</p>
                
                        <h4>Welcome Back to IdeaStack!</h4>
                        Requested Password Reset Code: <strong>${req.body.code}</strong>.<br/> 
                        Please use this code to access the privilege to reset your password. It will expire in 10 minutes<br/>
                        
                        <p>Best Regards,<br/>
                        Outreach team, IdeaStack™</p>
                        <br/><br/>
                        <img style = "width:152px; position:relative; margin:auto;" src="cid:ideastack@orgae.ee"/>
                        `,
                        attachments:[
                            {
                              fileName: 'IdeaStack.jpg',
                              path: 'server/routes/IdeaStack.jpg',
                              cid: 'ideastack@orgae.ee'
                            }
                          ]
                    }
                    const result = await transport.sendMail(mailOptions)
                    return result
                }catch (err) {
                    return(err)
                }
                } 
                sendMail().then(result=> {
                    console.log(result)
                }).catch(err=> {
                    console.log(err)
                })
                res.send('Code succesfully sent!')
        }
})

router.post('/resetPassword',async(req,res)=> {
    try {
        const user = await studentUser.findOne({email:req.body.email})
        console.log(req.body.pass)
        let hash = await bcrypt.hash(req.body.pass.trim(), 10)
        user.password = hash;
        await user.save()
        res.send('Done succesfully')
    }catch (err) {
        console.log(err)
        res.status(400).send(err)
    }
})

//sends back user data based on token
router.post('/getUser',auth,async(req,res)=> {
    try {
        const user = await studentUser.findById(req.user._id)
        res.send(user)
    }catch (err) {
        res.status(400).send(err)
    }
})

router.post('/getUserView',async(req,res)=> {
    try {
        const user = await studentUser.findById(req.body.token)
        res.send(user)
    }catch (err) {
        res.status(400).send(err)
    }
})

router.post('/updateUser',auth, async(req,res)=> {
    try {
        const userPrev = await studentUser.findById(req.user._id)
        updateInfo = {...req.body.user, password: userPrev.password}
        console.log(updateInfo)
        const newUser = await studentUser.findByIdAndUpdate(req.user._id, updateInfo)
        const updatedUser = await newUser.save()
        res.send(updatedUser)


    }catch (err) {
        console.log(err)
        res.status(400).send(err)
    }
}
)

router.post('/uploadProfPic',upload.single('image'),async(req,res)=> {
    const decoded = jwt.verify(req.body.token, process.env.TOKEN_SECRET);
    let id = decoded._id;
    const user = await studentUser.findOne({userId:id})
    
    let file = req.file;
    var fileUrl;
    await cloudinary.v2.uploader.upload(file.path, 
        { folder: "IdeaStack" },
     (err, result) => {
        fileUrl = result.secure_url           
        console.log('File Uploaded')
    }).catch(err=> console.log(err.response))
        let userUpdated = await studentUser.findOneAndUpdate({_id:id}, {profilePic : fileUrl}).catch(err=> console.log(err))
        let projects = await project.find({_id: {$in: user.projects}}).catch(err=> console.log(err))
        for(let i = 0; i<projects.length;i++) {
            let proj = projects[i];
            for(let i = 0; i<proj.team.length;i++) {
                if(JSON.stringify(proj.team[i].id)===JSON.stringify(userUpdated._id)){
                    proj.team[i].pic = fileUrl
                    proj.markModified('team')
                    if(i===0){
                        proj.admin.pic = fileUrl
                    }
                    proj.markModified('admin')
                    await proj.save()
                }
            }
        }
    
    res.send(userUpdated);
})

router.post('/removeAvailableDate',auth,async(req,res)=> {
    const mentor = await Mentor.findById(req.body.mentorID);
    mentor.availableDates = mentor.availableDates.filter(date=> {
        console.log(new Date(date))
        console.log(new Date(req.body.date))
       return String(new Date(date)) !== String(new Date(req.body.date))
    })

    mentor.markModified('availableDates');
   await mentor.save();
   console.log(mentor.availableDates)
   res.send('Succesfully Booked A Time')

})

router.post('/createProject',auth, async(req,res)=> {
    const user = await studentUser.findById(req.user._id);
    const userName = user.firstName + ' ' + user.lastName;
    const projectData = req.body.project;
    
    let newProject = new project({
        name: projectData.name,
        category: projectData.category,
        maxCap: projectData.maxCap,
        problem: projectData.problem,
        isFirstFree:true,
        admin: {
            name: userName,
            pic: user.profilePic,
            id: req.user._id
        },
        team: [
            {
                name: userName,
            pic: user.profilePic,
            id: req.user._id
            }
        ],
        projPic:projectData.projPic
    })

    newProject = await newProject.save().catch(err=> {
        console.log(err)
        res.status(400).send(err)
    })

    updateInfo = { projects: user.projects?[...user.projects, newProject._id]:[newProject._id]};


    const newUser = await studentUser.findOneAndUpdate({_id:req.user._id}, updateInfo).catch(err=> console.log(err))
    const updatedUser = await newUser.save().catch(err=> {
        console.log(err)
        res.status(400).send(err)
    })

    res.send(newProject)
})

router.post('/getUserProjects', auth, async(req,res)=> {
    const user = await studentUser.findById(req.user._id);
    const userProjects = user.projects;
    const projects = await project.find({_id: {$in: userProjects}});
    res.send(projects)
})

router.post('/getUserProjectsView', async(req,res)=> {
    const user = await studentUser.findById(req.body.token);
    const userProjects = user.projects;
    const projects = await project.find({_id: {$in: userProjects}});
    res.send(projects)
})

router.post('/getAllProjects', auth, async(req,res)=> {
    const projects = await project.find();
    res.send(projects)
})

router.post('/getAllUsers', auth, async(req,res)=> {
    const users = await studentUser.find();
    res.send(users)
})

router.post('/getAllProjectsAdmin',  async(req,res)=> {
    const projects = await project.find();
    res.send(projects)
})

router.post('/uploadPic',upload.single('image'),async(req,res)=> {
    const decoded = jwt.verify(req.body.token, process.env.TOKEN_SECRET);
    let id = decoded._id;
    
    let file = req.file;
    var fileUrl;
    await cloudinary.v2.uploader.upload(file.path, 
        { folder: "IdeaStack" },
     (err, result) => {
        fileUrl = result.secure_url           
        console.log('File Uploaded')
    }).catch(err=> console.log(err.response))
   
    res.send(fileUrl);
})


router.post('/uploadPicAdmin',upload.single('image'),async(req,res)=> {
     let file = req.file;
    var fileUrl;
    await cloudinary.v2.uploader.upload(file.path, 
        { folder: "IdeaStack" },
     (err, result) => {
        fileUrl = result.secure_url           
        console.log('File Uploaded')
    }).catch(err=> console.log(err.response))
   
    res.send(fileUrl);
})

router.post('/createJoinRequest', auth, async(req,res)=> {
    const proj = await project.findOne({_id: req.body.projectID});
    let date = new Date()
    proj.joinRequests = proj.joinRequests? [...proj.joinRequests, {...req.body.application, dateReceived:date }]:[{...req.body.application, dateReceived:date}]

    const user = await studentUser.findById(req.user._id);
    user.joinRequests =  user.joinRequests? [...user.joinRequests, {...req.body.application, dateReceived:date}]:[{...req.body.application, dateReceived:date}]

    user.save();
    proj.save()

    res.send('Join Request Succesfully Sent!')
})


router.post('/getLatestPendingPayment', auth, async(req,res)=> {

    const user = await studentUser.findById(req.user._id);
    const pendingPayments = user.pendingPayments;
    try{
        for(let i = 0; i<pendingPayments.length;i++) {
            if(pendingPayments[i].projectID===req.body.projectID) {
                res.send({payment:parseFloat(pendingPayments[i].amounts[pendingPayments[i].amounts.length-1])})
                return;
            }
        }
    } 
    catch (err){
        console.log(err);
        res.send('error')
    }
   

})

router.post('/completeLatestPendingPayment', auth, async(req,res)=> {

    const user = await studentUser.findById(req.user._id);
    const pendingPayments = user.pendingPayments;
    let amnt = 0;
    for(let i = 0; i<pendingPayments.length;i++) {
        if(pendingPayments[i].projectID===req.body.projectID) {
            amnt = user.pendingPayments[i].amounts.splice(0,1);
            user.pendingPayments[i].totalAmountForThisProject = user.pendingPayments[i].totalAmountForThisProject - amnt;
        }
    }

    user.markModified('pendingPayments');
    await user.save();

    proj = await project.findOne({_id: req.body.projectID});
    mentorshipPackage = proj.mentorshipPackages[0];
    mentorshipPackage.pendingAmount -= amnt;
    if(mentorshipPackage.pendingAmount==0) {
        proj.mentorshipPackages[0].paymentPending = false;
    }

    proj.markModified('mentorshipPackages');

    for(let i = 0; i<proj.team.length;i++){
        let member = proj.team[i];
        if(JSON.stringify(member.id)===JSON.stringify(req.user._id)) {
            if(parseInt(member.pendingPayments[0])===parseInt(amnt)){
               proj.team[i].pendingPayments[0] = 0;
            }
        }
    }

    proj.markModified('team');


    await proj.save()
    res.send('Payment Completed!')
})


router.post('/updateLatestPendingSession', auth, async(req,res)=> {

    proj = await project.findOne({_id: req.body.projectID});
    mentorshipPackage = proj.mentorshipPackages[0];
    if(mentorshipPackage.pendingAmount==0) {
        proj.mentorshipPackages[0] = {...mentorshipPackage, ...req.body.updated};
    }

    proj.markModified('mentorshipPackages');
    await proj.save()

    console.log('job done')
    res.send('Request Sent!')
})

router.post('/updateLatestPendingSessionAdmin', async(req,res)=> {

    proj = await project.findOne({_id: req.body.projectID});
    mentorshipPackage = proj.mentorshipPackages[0];
    if(mentorshipPackage.pendingAmount==0) {
        proj.mentorshipPackages[0] = {...mentorshipPackage, ...req.body.updated};
    }

    proj.markModified('mentorshipPackages');
    console.log(proj.mentorshipPackage)
    await proj.save()

    console.log('job done')
    res.send('Request Sent!')
})

router.post('/getProjectsPaid', async(req,res)=> {

    const proj = await project.find({});
    let projectsPaid = [];
    for(let i = 0; i<proj.length;i++) {
        for(let j = 0; j<proj[i].mentorshipPackages.length;j++) {
            if(proj[i].mentorshipPackages[i].paymentPending===false && proj[i].mentorshipPackages[i].sessionScheduled===false) {
                projectsPaid.push(proj[i])
            }
        }
    }
    
    res.send(projectsPaid)
})


router.post('/modifyMentorAdmin', async(req,res)=> {
    const updateInfo =req.body.mentor
    const newMentor = await Mentor.findByIdAndUpdate(req.body.id, updateInfo)
    newMentor.save()

    const projects = await project.find();

    for(let x = 0; x<projects.length;x++){
        for(let y = 0; y<projects[x].mentorshipPackages.length;y++){
            if(JSON.stringify(projects[x].mentorshipPackages[y]._id)===JSON.stringify(newMentor._id)){
                projects[x].mentorshipPackages[y] = {...projects[x].mentorshipPackages[y], ...updateInfo}
                console.log(projects[x].mentorshipPackages[y])
                projects[x].markModified('mentorshipPackages');
                projects[x].save()
            }
        }
    }
    
    res.send('Succesfully Modified Mentor')
})


router.post('/addMentorAdmin', async(req,res)=> {
    console.log(req.body.pic)
    const newMentor = new Mentor({
        name: req.body.name,
        background: req.body.background,
        pricing: req.body.pricing,
        strengths: req.body.strengths,
        role: req.body.role,
        contact: req.body.contact,
        pic:req.body.pic,
        mentorshipProp: req.body.mentorshipProp,
        availableDates: req.body.availableDates
    })
    const mentor = await newMentor.save()
    
    res.send('Succesfully Added Mentor')
})

module.exports = router
