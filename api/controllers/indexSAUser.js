const myDb = require('../managers/mysql');
const config = require('../config').superAdmin;

async function getAllUsers(data, cb) {
    const result = await myDb.getAllUsers({ ...data});
    return cb(null,result);
}

async function deleteUser(data, cb) {
    return cb(null, await myDb.deleteUser({ ...data }));
}

async function getUsersQueries(data, cb) {
    return cb(null, await myDb.getUsersQueries({ ...data }));
}

async function autorizeSA({login, password}, cb) {
    const result = {
        success: (login === config.login && password === config.password)
    }
    return cb(null, result);
}

module.exports = { deleteUser, getAllUsers, getUsersQueries, autorizeSA }