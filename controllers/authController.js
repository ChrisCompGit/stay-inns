const express = require('express');
const router = express.Router();

/////// MIDDLEWARE
const ensureLoggedIn = require('../middleware/ensureLoggedIn.js');
const loginFormValidation = require('../middleware/loginFormValidation');
const alreadyLoggedIn = require('../middleware/alreadyLoggedIn.js');

/////// MODELS
const authModel = require("../models/authModel.js");


// Depending on whether each user has to be logged in, add middleware that will check for a session ID. If not, don't inject data, if yes, inject data after login
router.get("/login", alreadyLoggedIn, (req,res)=>{

    res.render("login", {
        title: "Login Page",
    });

});


router.post("/login", loginFormValidation, async (req,res)=>{

    const {username,password} = req.body;

    const user = await authModel.authenticate(username,password);

    if (user.type === 'admin')
    {
        req.session.user = user;
        res.redirect("/admin")
    }

    else if (user.type === 'customer')
    {
        req.session.user = user;
        res.redirect("/user")
    }

    else
    {
        res.render("login",{
            title : "Login Page",
            error : "Username/password is incorrect. Please enter valid credentials to login"
        });
    }

})


router.get("/logout", ensureLoggedIn, (req,res)=>{
    
    req.session.user = undefined;

    res.redirect("/");
});



module.exports = router;