const io = require("socket.io-client");

const SERVER = "http://127.0.0.1:4000";
        const socket = io(SERVER);
        const param = {
            fields: ['slon.facts.user_id']
        };
       socket.emit("getData", param,(err, res) => {
            console.log(res);
        });
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