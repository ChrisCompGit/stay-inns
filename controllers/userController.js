const express = require('express');
const router = express.Router();


/////// MIDDLEWARE

const userFormValidation = require('../middleware/userFormValidation.js');
const ensureLoggedIn = require('../middleware/ensureLoggedIn.js');


/////// MODELS

const userModel = require("../models/userModel.js");
const authModel = require('../models/authModel.js');
const propertyModel = require('../models/propertyModel.js');


/////// ROUTES

// add middleware that will check for a session ID. If not, don't inject data, if yes, inject data
// After creating session IDs redirect and inject data into handlebars using the res.locals.variable code and display the user info on the home page

router.post("/registration", userFormValidation, async (req,res)=>{

    const user_form_data = req.body;
    /*
    await authModel.verifyEmail(user_form_data.email);
    if (email)
    {
        res.render("signup",{
            title : "Sign Up Page",
            emailError : "Email address is already used."
        });
    }
    */
    await userModel.createUser(user_form_data);

});


router.get("/", ensureLoggedIn, (req,res)=>{
    
    res.render("userDashboard", {
        title: "Home Page",
        movies: ["Testing", "Logged In", "User"] // TO BE DELETED
        
    });

});


router.get("/destinations", ensureLoggedIn, async (req,res)=>{

    const allProperties = await propertyModel.getAllProperties();

    res.render("destinationListing", {
        title: "Destination Listing",
        destination: `${allProperties.title}, ${allProperties.title}, ${allProperties.location}, ${allProperties.rating}, ${allProperties.price}, ${allProperties.type}, ${allProperties.img}, ${allProperties.details}, ${allProperties.admin_id}`

    });

});


/* Build Database first and create details page */
router.get("/details/:propertyid", async (req,res)=>{

    let id = parseInt(`${req.params.propertyid}`); //if not working, try original code: let id = req.params.propertyid; <br> id = parseInt(`${req.params.id}`);
    
    const property = await propertyModel.getProperty(id);
        
    res.render("destinationDetails", {
        title: `${property.title}`,
        destination: `${property.title}, ${title}, ${location}, ${rating}, ${price}, ${type}, ${img}, ${details}, ${admin_id}`

    });

});




//add code to edit user data (add an edit page)


module.exports = router;