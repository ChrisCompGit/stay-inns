const express = require('express');
const {create} = require('express-handlebars');
const session = require('express-session');
const fileUpload = require('express-fileupload');
require('dotenv').config();
const path = require('path');


// IMPORT CONTROLLERS
const generalController = require('./controllers/generalController.js');
const authController = require("./controllers/authController.js");
const userController = require('./controllers/userController.js');
const adminController = require('./controllers/adminController.js');
const {application} = require('express');


// CHANNELS ALL REQUESTS AND RESPONSES THROUGH EXPRESS
const app = express();


// CREATE SESSIONS
app.use(session({
    secret: process.env.SESS_SEC,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }));


// INCLUDE HELPERS IN HANDLEBARS
const hbs = create({
    helpers: {
        if_eq(val1,val2,options) { 

            if(val1 === val2)
            {
                return  options.fn(this);
            }
         }
    }
});


// TELLS APP THAT EXPRESS HANDLEBARS IS OUR TEMPLATE ENGINE
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', './views');


// CONVERT HTML FORM DATA TO AN OBJECT (req.body)
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());


// ACCESS TO PUBLIC FOLDER
app.use(express.static('public'));
app.use("/img", express.static(path.join(__dirname, "/public/img")));


// MAKES SESSION DATA AVAILABLE ACROSS ALL HANDLEBARS PAGES
app.use((req,res,next)=>{
    res.locals.user = req.session.user;
    console.log(res.locals.user);
    next();
});


// ASSIGN CONTROLLERS TO ROUTES
app.use("/", generalController);
app.use("/auth", authController);
app.use("/user", userController);
app.use("/admin", adminController);


//START UP SERVER ON SPECIFIC PORT
const PORT = 3000;
app.listen(PORT,()=>{
    console.log(`Web server is up and running on PORT ${PORT}`);
})