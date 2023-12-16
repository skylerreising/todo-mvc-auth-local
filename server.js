const express = require('express')//express
const app = express()//app is express
const mongoose = require('mongoose')//handles our database
const passport = require('passport')//handles authentication
const session = require('express-session')//helps us have logged in users and know they are logged in. Cookie!
const MongoStore = require('connect-mongo')(session)//helps us have logged in users
const flash = require('express-flash')//handles invalid sign in
const logger = require('morgan')//logger to see requests coming through
const connectDB = require('./config/database')//connects to mongo database
const mainRoutes = require('./routes/main')//main route CRUD handling
const todoRoutes = require('./routes/todos')//\todo route CRUD handling

require('dotenv').config({path: './config/.env'})//tell express to use the environment variables

// Passport config
require('./config/passport')(passport)//tell our application to use passport

connectDB()//tell our application to connect to the mongo database

app.set('view engine', 'ejs')//using ejs for our views
app.use(express.static('public'))//front end files
app.use(express.urlencoded({ extended: true }))//lets us pull and look at anything we need out of the requests
app.use(express.json())//lets us pull and look at anything we need out of the requests
app.use(logger('dev'))//setting up morgan to run and log everything
// Sessions
app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),//store session info in mongo database
    })
  )
  
// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())
  
app.use('/', mainRoutes)
app.use('/todos', todoRoutes)
 
app.listen(process.env.PORT, ()=>{//kick off our server!
    console.log('Server is running, you better catch it!')
})    