const db = require('../config/db.js');
const bcrypt = require("bcryptjs");

class Auth {

    static async authenticate (username,password)
    {
        const results = await db.query(`SELECT user_id, first_name, last_name, email, username, password, type FROM users WHERE username='${username}'`);
        const user = results.rows[0];
        
        if(user) {
            const isValid = await bcrypt.compare(password,user.password);
            if (isValid === true) {
                return user;
            }
        }
        return null;
    }

    /*
    static async verifyEmail (email)
    {
        const results = await db.query(`SELECT email FROM users WHERE email='${email}`);
        const emailAdd = results.rows[0];
        
        if(emailAdd !== null && emailAdd !== undefined) {
            return emailAdd;
        }
        return null;
    }
    */

}    

module.exports = Auth;