const myDb = require('../managers/mysql');

function createUser(data){
    await myDb.createUser({...data});
}

function updateUser(data){
    await myDb.updateUser({...data});
}

function deleteUser(data){
    await myDb.deleteUser({...data});
}

function checkUser(data){
    await myDb.checkUser({...data});
}

function forgotUser(data){
    await myDb.forgotUser({...data});
}


module.exports = {createUser, updateUser, checkUser, deleteUser, forgotUser}