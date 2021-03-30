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
                data: { login, first_name, last_name, user_id: rows.insertId },
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
        const passwordStr = password ? `, password = '${password}'` : ``;
        const [rows] = await connection.execute(`UPDATE users SET login = '${login}' ${passwordStr}, first_name = '${first_name}', last_name = '${last_name}' WHERE user_id = ${user_id}`);
        if (rows.changedRows) {
            response = {
                success: true,
                data: { login, first_name, last_name, user_id },
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
        const [rows] = await connection.execute(`SELECT user_id, first_name, last_name, isApproved FROM users WHERE login = '${login}' AND password = '${password}'`);
        let response = { success: false };
        if (rows.length && rows[0].isApproved) {
            response = {
                data: { ...rows[0], login },
                success: true
            }
        } else if(rows.length && !rows[0].isApproved) {
            response = {
                msg: `${login} is not Approved`,
                success: false
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
        const [rows] = await connection.execute(`SELECT user_id, login, first_name, last_name FROM users WHERE user_id = ${user_id}`);
        console.log(rows[0]);
        return rows.length ? {
            data: { ...rows[0] },
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
        await connection.execute(`DELETE FROM users WHERE user_id = ${user_id}`);
        await connection.execute(`DELETE FROM requests WHERE user_id = ${user_id}`);
        return { success: true };
    } catch (error) {
        console.error(error);
        return { error, success: false };
    };
}

async function createQuery({ user_id, request_date, request_query, request_query_name }) {
    try {
        const connection = await db.connection();
        let response = { success: false };
        const [rows] = await connection.execute(`INSERT INTO requests (user_id, request_date, request_query, request_query_name) VALUES (${user_id}, '${request_date}', '${request_query}', '${request_query_name}')`);
        console.log(rows.insertId);
        response = {
            success: true,
            data: { request_id: rows.insertId, user_id, request_query_name, request_query, request_date },
            msg: `${request_query_name} is created`
        }
        return response;
    } catch (error) {
        console.error(error);
        return error;
    };
}

async function updateQuery({request_id, request_date, request_query, request_query_name }) {
    try {
        const connection = await db.connection(); 
        let response = { success: false };
        const [rows] = await connection.execute(`UPDATE requests SET request_date = '${request_date}', request_query = '${request_query}', request_query_name = '${request_query_name}', request_date = now() WHERE request_id = ${request_id}`);
        response = {
            success: true,
            data: {request_id, request_query, request_query_name},
            msg: `${request_query_name} is updated`
        }
        return response;
    } catch (error) {
        console.error(error);
        return error;
    };
}

async function selectQueries({ user_id }) {
    try {
        const connection = await db.connection();
        let response = { success: false };
        const [rows] = await connection.execute(`SELECT request_id, request_date, request_query, request_query_name FROM requests WHERE request.user_id = ${user_id} ORDER BY request_date`);
        response = {
            success: true,
            data: rows || [],
        }
        return response;
    } catch (error) {
        console.error(error);
        return error;
    };
}

async function getUsersQueries({ user_id, date_from = '1970-01-01', date_to = 'now()'}) {
    try {
        const connection = await db.connection();
        let response = { success: false };
        let condition = '';
        if (user_id) {
            condition = ` AND request.user_id = ${user_id}`;
        }
        const [rows] = await connection.execute(`SELECT request_id, request_date, request_query, request_query_name, login, first_name, last_name FROM requests, users WHERE request_date BETWEEN ${date_from} AND ${date_to} AND request.user_id = users.user_id  ORDER BY request_date`);
        response = {
            success: true,
            data: rows,
        }
        return response;
    } catch (error) {
        console.error(error);
        return error;
    };
}

async function getAllUsers({isApproved = 1}) {
    try {
        const connection = await db.connection();
        let response = { success: false };
        const [rows] = await connection.execute(`SELECT user_id, login, first_name, last_name FROM users WHERE isApproved = ${isApproved} ORDER BY login`);
        response = {
            success: true,
            data: rows,
        }
        return response;
    } catch (error) {
        console.error(error);
        return error;
    };
}

async function setApprove({user_id}) {
    try {
        const connection = await db.connection();
        let response = { success: false };
        const [rows] = await connection.execute(`UPDATE users SET isApproved = 1 WHERE user_id = ${user_id}`);
        response = {
            success: true
        }
        return response;
    } catch (error) {
        console.error(error);
        return error;
    };
}

async function removeAllUsers() {
    try {
        const connection = await db.connection();
        let response = { success: false };
        await connection.execute(`DELETE FROM requests`);
        await connection.execute(`DELETE FROM users`);
        response = {
            success: true
        }
        return response;
    } catch (error) {
        console.error(error);
        return error;
    };
}

module.exports = { createUser, checkUser, updateUser, deleteUser, checkLogin, getUserData, selectQueries, createQuery, updateQuery, getAllUsers, getUsersQueries, setApprove, removeAllUsers};
