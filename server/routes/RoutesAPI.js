const router = require('express').Router()
const nodemailer = require('nodemailer')
const studentUser = require('../models/studentUser')
const project = require('../models/project')
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


router.post('/sendUserQuery',(req,res)=> {
        async function sendMail(){
        try {
            const transport = nodemailer.createTransport({
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
            const result = transport.sendMail(mailOptions)
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
                email: req.body.email,
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

//receives login credentials
//checks if user exists in database
//sends back user and token
router.post('/login', async(req,res)=> {
    try {
        const user = await studentUser.findOne({email:req.body.email.trim()})
        if(!user) {
            console.log('- User not found')
            res.status(401).send('User not found')
        }else {
            const isMatch = await bcrypt.compare(req.body.password, user.password)
            if(!isMatch) {
                console.log('- Incorrect password')
                res.status(401).send('Incorrect password')
            }else {
                const token = jwt.sign({_id:user._id}, 
                    process.env.TOKEN_SECRET,
                    {expiresIn:'2.5h'});
                console.log('- Logged In')
                res.send({user:user, userToken: token})
            }
        }
    }catch (err) {
        console.log(err)
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
    console.log(fileUrl)
        let userUpdated = await studentUser.findOneAndUpdate({_id:id}, {profilePic : fileUrl}).catch(err=> console.log(err))
    
    res.send(userUpdated);
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
        admin: {
            name: userName,
            pic: user.profilePic
        },
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

router.post('/getAllProjects', auth, async(req,res)=> {
    const projects = await project.find();
    res.send(projects)
})

router.post('/uploadProjPic',upload.single('image'),async(req,res)=> {
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
   
    res.send(fileUrl);
})


module.exports = router
