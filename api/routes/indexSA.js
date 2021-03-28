const config = require('../config').superAdmin;
const { deleteUser, getAllUsers, getUsersQueries, autorizeSA } = require('../controllers/indexSAUser');

module.exports = function (socket) {
    socket.on('getAllUsers', getAllUsers);
    socket.on('getUsersQueries', getUsersQueries);
    socket.on('deleteUser', deleteUser);
    socket.on('autorizeSA',  autorizeSA);
}