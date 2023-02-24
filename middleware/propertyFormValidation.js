const propertyFormValidation = (req, res, next) => {

    const errors = [];

    const {title, location, rating, price, type, img, details} = req.body;

    if (title === "") 
    {
        errors.push("You must enter a title for the property");
    }


    if (location === "") 
    {
        errors.push("You must enter the property's location");
    }


    if (rating === "") 
    {
        errors.push("You must enter a rating for the property");
    }


    if (price === "") 
    {
        errors.push("You must enter a price for the property");
    }


    if (type === "") 
    {
        errors.push("You must select a property type");
    }


    if (img === "") 
    {
        errors.push("You must add at least one (1) image of the property");
    }


    if (details === "") 
    {
        errors.push("You must enter details about the property");
    }


    if (errors.length > 0)
    {
        res.render("propertyCreation", {
            title: "Create Property",
            errors,
            current_form_data: req.body
        });
    }

    else
    {
        next();
    }

}

module.exports = propertyFormValidation;