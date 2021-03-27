const io = require("socket.io-client");

const SERVER = "http://127.0.0.1:4000";
const socket = io(SERVER);
const param = {
    fields: ['slon.facts.user_id']
};

socket.emit('remindUser', {
    code: '1616874380511code_14'
}, (err, res) => {
    console.log(res);
});

//socket.emit("checkUser", {login:'ssss',password:'ss'}, (err, res) => {
//    console.log(res)                
//});
//{id:2, login: 'sssss', success: true }