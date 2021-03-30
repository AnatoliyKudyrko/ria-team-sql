const myDb = require('../managers/mysql');

async function createQuery(data, cb) {
    return cb({test:'test'}, await myDb.createQuery({ ...data }));
}


async function updateQuery(data, cb) {
    return cb(null, await myDb.updateQuery({ ...data }));
}

async function removeQuery(data, cb) {
    return cb(null, await myDb.removeQuery({ ...data }));
}
async function selectQueries(data, cb) {
    return cb({test:'test'}, await myDb.selectQueries({ ...data }));
}

module.exports = { createQuery, updateQuery, selectQueries, removeQuery }