const loginFormValidation = (req, res, next) => {

    const errors = [];

    const {username, password} = req.body;

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
        res.render("login", {
            title: "Login Page",
            errors,
            current_form_data: req.body
        });
    }

    else
    {
        next();
    }

}

module.exports = loginFormValidation;