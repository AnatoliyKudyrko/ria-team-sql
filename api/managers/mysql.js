const mysql = require("mysql2/promise");
const config = require('../config').mysql;
let db = (function () {
    let instance;
    return {
        connection: async function () {
            if (instance == null) {
                instance = await mysql.createConnection(config);
            }
            return instance;
        }
    };
})();


async function createUser({ login, password, first_name, last_name }) {

    try {
        const connection = await db.connection();
        const { user_id, success } = await checkLogin({ login });
        let response = { success: false };
        if (!success) {
            const [rows] = await connection.execute(`INSERT INTO users (login, password, first_name, last_name) VALUES ('${login}', '${password}', '${first_name}', '${last_name}')`);
            console.log(rows.insertId);
                response = {
                    success: true,
                    data: { login, first_name, last_name, user_id: rows.insertId},
                    msg: `${login} is created`
                }
        } else {
            response = {
                success: false,
                msg: `${login} is already present`
            }
        }
        return response;
    } catch (error) {
        console.error(error);
        return error;
    };
}

async function updateUser({ user_id, login, password, first_name, last_name }) {
    try {
        const connection = await db.connection();
        let response = { success: false };
        const [rows] = await connection.execute(`UPDATE users SET login = '${login}', password = '${password}', first_name = '${first_name}', last_name = '${last_name}' WHERE user_id = '${user_id}'`);
        if (rows.changedRows) {
            response = {
                success: true,
                data: { login, first_name, last_name, user_id},
                msg: `${login} is updated`
            }
        }
        return response;
    } catch (error) {
        console.error(error);
        return error;
    };
}

async function checkUser({ login, password }) {
    try {
        const connection = await db.connection();
        const [rows] = await connection.execute(`SELECT user_id, first_name, last_name FROM users WHERE login = '${login}' AND password = '${password}'`);
        let response = {success: false};
        if (rows.length) {
            response = {
                data: {...rows[0], login},
                success: true
            }            
        } else {
            const { user_id } = await checkLogin({ login });
            const msg = user_id ? 'Password is wrong' : 'Login isn\'t registered';
            response = {
                user_id: user_id || null,
                success: false,
                msg
            }
        }
        console.log(response);
        return response;
    } catch (error) {
        console.error(error);
        return error;
    };
}

async function checkLogin({ login }) {
    try {
        const connection = await db.connection();
        const [rows] = await connection.execute(`SELECT user_id FROM users WHERE login = '${login}'`);
        return rows.length ? {
            user_id: rows[0].user_id,
            success: true
        } : {
            success: false
        }
    } catch (error) {
        return { error, success: false };
    };
};

async function getUserData({ user_id }) {
    try {
        const connection = await db.connection();
        const [rows] = await connection.execute(`SELECT user_id, login, first_name, last_name FROM users WHERE user_id = '${user_id}'`);
        console.log(rows[0]);
        return rows.length ? {
            data: {...rows[0]},
            success: true
        } : {
            success: false
        }
    } catch (error) {
        return { error, success: false };
    };
};

async function deleteUser({ user_id }) {
    try {
        const connection = await db.connection();
        await connection.execute(`DELETE user_id FROM users WHERE user_id = '${user_id}'`);
        return { id };
    } catch (error) {
        console.error(error);
        return error;
    };
}

module.exports = { createUser, checkUser, updateUser, deleteUser, checkLogin, getUserData };
