const express   = require('express')
const app       = express()
const mongoose = require('mongoose')
const cors = require('cors')
const RoutesAPI = require('./server/routes/RoutesAPI')
const path = require('path')
const dotenv = require('dotenv')

dotenv.config()

mongoose.connect(process.env.MONGODB,{useUnifiedTopology:true,useNewUrlParser:true },
    ).then(()=> {
          console.log('- Connected to IdeaStack Database...')
      }).catch(err=> console.log(err))

mongoose.connection.on('error', function (err) { console.log(err) });

app.use(express.json())

app.use(cors())

const port = process.env.PORT||4000;

app.use('/api/user',RoutesAPI)

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req,res)=> {
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

app.listen(port,()=> {
    console.log(`- Successfully connected to server at port ${port}`)
})