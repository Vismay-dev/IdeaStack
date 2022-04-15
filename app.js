const express   = require('express')
const app       = express()
const mongoose = require('mongoose')
const cors = require('cors')
const RoutesAPIUser = require('./server/routes/RoutesAPIUser')
const RoutesAPIProject = require('./server/routes/RoutesAPIProject')
const path = require('path')
const dotenv = require('dotenv')
const http = require('http').createServer(app)
const jwt = require('jsonwebtoken')
const User = require('./server/models/studentUser')
const cloudinary = require('cloudinary')
const session = require('express-session')


const MongoDBSession = require('connect-mongodb-session')(session)

dotenv.config()

app.use(cors())

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

const io = require('socket.io')(http, {
    cors: {
      origin: process.env.NODE_ENV ==='production'?'https://ideastack.herokuapp.com:3000':'http://localhost:3000',
      methods: ["GET", "POST"]
    }
  }) 




mongoose.connect(process.env.MONGODB,{useUnifiedTopology:true,useNewUrlParser:true },
    ).then(()=> {
          console.log('- Connected to IdeaStack Database...')
      }).catch(err=> console.log(err))

mongoose.connection.on('error', function (err) { console.log(err) });

app.use(express.json())


io.on('connection', (socket) => {
   
})

const port = process.env.PORT||4000;

app.use(session({
    secret: process.env.SESHSECRET,
    resave:false,
    saveUninitialized:false    
}))

app.use('/api/user',RoutesAPIUser)
app.use('/api/project',RoutesAPIProject)


if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.use('*', express.static('client/build'));     

    app.get('*', (req,res)=> {
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

http.listen(port,()=> {
    console.log(`- Successfully connected to server at port ${port}`)
})