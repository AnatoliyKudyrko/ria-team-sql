const app = require('express')();
const http = require('http').createServer(app);
const ClickHouse = require('@apla/clickhouse');
const ch = new ClickHouse({ host: 'localhost', port: 8123 })


const PORT = 4000;
const io = require('socket.io')(http,{
    cors: {
        origin: '*',
    }
});


ch.query("SELECT * FROM mviews.calltracking", (err, data) => {
    io.on('connection',  (socket) => {
        socket.emit('mviews.calltracking', data);
    });
})
ch.query("SELECT * FROM slon.facts", (err, data) => {
    io.on('connection',  (socket) => {
        socket.emit('slon.facts', data);
    });
})
ch.query("SELECT * FROM slon.r_tags_v2", (err, data) => {
    io.on('connection',  (socket) => {
        socket.emit('slon.r_tags_v2', data);
    });
})


io.on('connection',  (socket) => {
    socket.on('req', function( param, callbackFn){
        ch.query(param, (err, data) => {
                callbackFn(null , data);
        })
    });

});



http.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});
