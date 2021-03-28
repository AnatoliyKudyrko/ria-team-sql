const app = require('express')();
const http = require('http').createServer(app);
//const ClickHouse = require('@apla/clickhouse');
const { ClickHouse } = require('clickhouse');
const config = require('./config'),
      err = require('./helpers/error');
const slonDb = new ClickHouse({...config.clickhouse, config: { database: 'slon'}});
const mviewsDb = new ClickHouse({...config.clickhouse, config: { database: 'mviews'}});

const fullDbs = new ClickHouse({...config.clickhouse});
const systemDb = new ClickHouse({...config.clickhouse, config: { database: 'system'}});
const databases = ['slon', 'mviews'];

const clickhouse = new ClickHouse({...config.clickhouse});
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