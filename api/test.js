const io = require("socket.io-client");

const SERVER = "http://127.0.0.1:4000";
        const socket = io(SERVER);
        socket.emit("getTables", (err, res) => {
            console.log(res);
        });
        socket.emit("getFields", 'slon', 'facts', (err, res) => {
            console.log(res);
        });
/*        socket.emit("req", 'SELECT name FROM system.columns', (err, res) => {
            console.log(res);
            console.log(err);
        });
    */    