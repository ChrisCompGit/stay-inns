const userFormValidation = (req, res, next) => {

    const errors = [];

    const {firstName, lastName, email, username, password} = req.body;

    if (firstName === "") 
    {
        errors.push("You must enter a first name");
    }


    if (lastName === "") 
    {
        errors.push("You must enter a last name");
    }


    if (email === "") 
    {
        errors.push("You must enter an email address");
    }


    if (username === "") 
    {
        errors.push("You must enter a username");
    }


    if (password === "") 
    {
        errors.push("You must enter a password");
    }


    if (errors.length > 0)
    {
        res.render("signup", {
            title: "Sign Up",
            errors,
            current_form_data: req.body
        });
    }

    else
    {
        next();
    }

}

module.exports = userFormValidation;