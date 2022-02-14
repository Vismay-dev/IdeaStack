const router = require('express').Router()
const nodemailer = require('nodemailer')
const fs = require('fs')

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

module.exports = router
