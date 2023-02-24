const ensureAdmin = (req, res, next) => {

    const user = req.session.user;

    if(user.type !== 'admin')
    {
        res.redirect("/");
    }

    else
    {
        next();
    }

}


module.exports = ensureAdmin;