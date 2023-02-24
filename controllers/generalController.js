const express = require('express');
const router = express.Router();


// Depending on whether each user has to be logged in, add middleware that will check for a session ID. If not, don't inject data, if yes, inject data after login
router.get("/",(req,res)=>{
    res.render("index", {
        title: "Home Page",
        movies: ["Titanic", "Blade", "Wonder Woman"] // TO BE DELETED
    });
});


router.get("/signup", (req,res)=>{
    res.render("signup", {
        title: "Sign Up"
    });
});


module.exports = router;