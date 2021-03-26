const mysql = require("mysql2");
const config = require('../config').mysql;


const connection = mysql.createConnection(config);

async function createUser({login, password, first_name, last_name}) {
    try {
        const [[isExists]] = await connection.execute(`SELECT login FROM users WHERE login = '${login}'`);
        if (!isExists) {
            [rows] = await connection.execute(`INSERT INTO users (login, password, first_name, last_name) VALUES ('${login}', '${password}', '${first_name}', '${last_name}')`);
        } else {
            throw new Error(`${login} is already present`);
        }
        return data;
    } catch (error) {
        console.error(error);
        return error;
    };
}

async function updateUser({user_id, login, password, first_name, last_name}) {
    try {

        const [rows, fields] = await connection.execute(`UPDATE users SET  login = '${login}', password = '${password}', first_name = '${first_name}', last_name = '${last_name}') 
        WHERE user_id = '${user_id}'`);
        
        return user_id;
    } catch (error) {
        console.error(error);
        return error;
    };
}

async function checkUser({login, password}) {
    try {
        const [[id]] = await connection.execute(`SELECT user_id FROM users WHERE login = '${login}' AND password = '${password}'`);
        console.log(id);
        if (!id) {
            const [[logId]] = await connection.execute(`SELECT user_id FROM users WHERE login = '${login}'`);
            const err = logId ? 'Password is wrong' : 'Login isn\'t registered';
            throw new Error (err);
        }
        return {id};
    } catch (error) {
        console.error(error);
        return error;
    };
}

async function deleteUser({user_id}) {
    try {
        await connection.execute(`DELETE user_id FROM users WHERE user_id = '${user_id}'`);
        return {id};
    } catch (error) {
        console.error(error);
        return error;
    };
}

module.exports = {createUser, checkUser, updateUser, deleteUser};
