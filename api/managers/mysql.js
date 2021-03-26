const mysql = require("mysql2/promise");
const config = require('../config').mysql;
let db = (function(){
    let instance;
    return {
        connection: async function(){
            if (instance == null) {
                instance = await mysql.createConnection(config);
            }
            return instance;
        }
   };
})();


async function createUser({login, password, first_name, last_name}) {

    try {
        const connection = await db.connection();
        const [[isExists]] = await connection.execute(`SELECT login FROM users WHERE login = '${login}'`);
        if (!isExists) {
           const [rows] = await connection.execute(`INSERT INTO users (login, password, first_name, last_name) VALUES ('${login}', '${password}', '${first_name}', '${last_name}')`);
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
        const connection = await db.connection();
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
        const connection = await db.connection();
        const user_id = await connection.execute(`SELECT user_id FROM users WHERE login = '${login}' AND password = '${password}'`);
        console.log(user_id);
        if (!user_id) {
            const {userIsRegistered} = await checkLogin({login});
            const err = userIsRegistered ? 'Password is wrong' : 'Login isn\'t registered';
            throw new Error (err);
        }
        return {user_id};
    } catch (error) {
        console.error(error);
        return error;
    };
}

async function checkLogin({login}) {
    try {
        const connection = await db.connection();
        const [rows] = await connection.execute(`SELECT user_id FROM users WHERE login = '${login}'`);
        return {userRegisteredId: rows.length ? row[0].user_id : false}
    } catch (error) {
        return {error};
    };
};

async function deleteUser({user_id}) {
    try {
        const connection = await db.connection();
        await connection.execute(`DELETE user_id FROM users WHERE user_id = '${user_id}'`);
        return {id};
    } catch (error) {
        console.error(error);
        return error;
    };
}

module.exports = {createUser, checkUser, updateUser, deleteUser, checkLogin};
