const express = require('express');
const router = express.Router();

/////// MIDDLEWARE

const ensureAdmin = require('../middleware/ensureAdmin.js');
const propertyFormValidation = require('../middleware/propertyFormValidation.js');


/////// MODELS

const userModel = require('../models/userModel.js');
const propertyModel = require('../models/propertyModel.js');


/////// ROUTES

router.get("/", ensureAdmin, async (req,res)=>{
    
    const allProperties = await propertyModel.getAllProperties();

    res.render("adminDashboard", {
        title: "Admin Dashboard",
        property: allProperties

    });
});


/*   
router.get("/property-list", ensureAdmin, async (req,res)=>{

    const allProperties = await userModel.getAllProperties();

    res.render("propertyList", {
        title: "Dashboard"

    });
});
*/


router.get("/add-property", ensureAdmin, (req,res)=>{

    res.render("propertyCreation", {
        title: "Add a Property"

    });
});


router.post("/create-property", propertyFormValidation, async (req,res)=>{

    console.log(req.files);

    //variables
    const property_form_data = req.body;
    const user = req.session.user;
    const img = req.files.img;

    //error handling for req.files not present
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
   
    let uploadPath = process.cwd() + '/public/img/uploaded' + img.name

    // Use the mv() method to place the file somewhere on your server
    try {
        await img.mv(uploadPath);
        } 
    catch (err) {
        return res.status(500).send(err);
      }
    
    await propertyModel.createProperty(property_form_data, img, user.user_id);

    res.render("adminDashboard", {
        title: "Admin Dashboard",
        successMsg: "Property Added Successfully",

    });
    
});


//insert authentication middleware | Also, this page should be able to delete via a button
router.get("/edit-property", ensureAdmin, (req,res)=>{

    res.render("propertyEdit", {
        title: "Edit a Property"

    });
});



/*
router.get("/details/:id", async (req,res)=>{
    const id = parseInt(`${req.params.id}`);
    
    await userModel.getUser(id);

    res.render(``)
});

router.get("/:id",(req,res)=>{
    res.render(`User for ${req.params.id}`)
});
*/

module.exports = router;