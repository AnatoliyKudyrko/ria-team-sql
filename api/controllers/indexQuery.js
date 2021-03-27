const myDb = require('../managers/mysql');

async function createQuery(data, cb) {
    return cb(await myDb.createQuery({ ...data }));
}


async function updateQuery(data, cb) {
    return cb(await myDb.updateQuery({ ...data }));
}


async function selectQueries(data, cb) {
    return cb(await myDb.selectQueries({ ...data }));
}
module.exports = { createQuery, updateQuery, selectQueries }