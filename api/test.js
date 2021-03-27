const io = require("socket.io-client");

const SERVER = "http://127.0.0.1:4000";
const socket = io(SERVER);
const param = {
    fields: ['slon.facts.user_id']
};
/*    socket.emit("getData", param,(err, res) => {
        console.log(res);
    });
    socket.emit("getTables", (err, res) => {
        console.log(res);
    });
    socket.emit("getFields", 'slon', 'facts', (err, res) => {
        console.log(res);
    });*/

/*        socket.emit("req", 'SELECT name FROM system.columns', (err, res) => {
            console.log(res);
            console.log(err);
        });
    */
socket.emit('createUser', {
    login: 'det@ukr.net',
    password: 'a2',
    first_name: 'a3',
    last_name: 'a4'
}, (err, res) => {
    console.log(res);
});

socket.emit('updateUser', {
    user_id: 12,
    login: 'b1111',
    password: 'b2',
    first_name: 'b3',
    last_name: 'b4'
}, (err, res) => {
    console.log(res);
});

socket.emit('checkUser', {
    login: 'b1111',
    password: 'b2'
}, (err, res) => {
    console.log(res);
});

socket.emit('checkUser', {
    login: 'b1111',
    password: 'b222'
}, (err, res) => {
    console.log(res);
});

socket.emit('checkUser', {
    login: 'vvv1',
    password: 'b222'
}, (err, res) => {
    console.log(res);
});

socket.emit('forgotUser', {
    login: 'det@ukr.net'
}, (err, res) => {
    console.log(res);
});

//socket.emit("checkUser", {login:'ssss',password:'ss'}, (err, res) => {
//    console.log(res)                
//});
//{id:2, login: 'sssss', success: true }