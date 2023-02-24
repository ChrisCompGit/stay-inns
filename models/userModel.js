const db = require('../config/db.js');
const bcrypt = require('bcryptjs');

class User {

    static async createUser(user)
    {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(user.password,salt);
        await db.query(`INSERT INTO users (first_name, last_name, email, username, password) VALUES ('${user.firstName}', '${user.lastName}', '${user.email}', '${user.username}', '${hashPassword}')`);
    }


    static async getAllUsers()
    {
        const results = await db.query("SELECT user_id, first_name, last_name, email, username, password, type FROM users")
        return results.rows;
    }


    static async getUser(id)
    {
        const results = await db.query(`SELECT user_id, first_name, last_name, email, username, password, type FROM users WHERE user_id = ${id}`)
        return results.rows[0];
    }


    static async updateUser(user_form_data,id)
    {
        await db.query(
            `UPDATE users SET first_name = '${user_form_data.firstName}',
            last_name = '${user_form_data.lastName}',
            username = '${user_form_data.username}',
            email = '${user_form_data.email}',
            password = '${user_form_data.password}',
            WHERE user_id = ${id}`);
    }


    static async deleteUser(id)
    {
        await db.query(`DELETE FROM users WHERE user_id = ${id}`);
    }

/*
    static async createAdmin (username)
    {
        await db.query(`UPDATE users SET type = 'admin' WHERE username = ${username}`);
    }
*/

}

module.exports = User;