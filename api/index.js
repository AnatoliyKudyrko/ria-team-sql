const app = require('express')();
const http = require('http').createServer(app);
//const ClickHouse = require('@apla/clickhouse');

const routes = require('./routes');

const PORT = 4000;
const io = require('socket.io')(http,{
    cors: {
        origin: '*',
    }
});


/*
io.on('connection',  (socket) => {
    socket.on('req', function( param, callbackFn){
        ch.query(`${param} FORMAT JSONEachRow`, (err, data) => {
                callbackFn(null , data);
        })
    });
});
*/
//csystemDb.query(`SELECT name FROM columns`, (err, data) => {    console.log(data);})

//приймає запит у вигляді сроки та віддає дані по цьому запиту
function namer(item, index) {
    return item.name;
}

function dateFilter(item) {
    return !(['EventDate','HourDate', 'MinuteDate', 'SecondDate', 'date_time'].includes(item))
}

io.on('connection',  (socket) => {
    routes(socket);
});



http.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});