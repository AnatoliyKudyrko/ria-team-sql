const app = require('express')();
const http = require('http').createServer(app);
//const ClickHouse = require('@apla/clickhouse');
const { ClickHouse } = require('clickhouse');
const config = require('./config'),
      err = require('./helpers/error');
const slonDb = new ClickHouse({...config.clickhouse, config: { database: 'slon'}});
const mviewsDb = new ClickHouse({...config.clickhouse, config: { database: 'mviews'}});
const systemDb = new ClickHouse({...config.clickhouse, config: { database: 'system'}});
const databases = ['slon', 'mviews'];

const clickhouse = new ClickHouse({...config.clickhouse});

const PORT = 4000;
const io = require('socket.io')(http,{
    cors: {
        origin: '*',
    }
});
console.log(slonDb);

/*ch.query("SELECT * FROM mviews.calltracking", (err, data) => {
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
})*/


/*
io.on('connection',  (socket) => {
    socket.on('req', function( param, callbackFn){
        ch.query(`${param} FORMAT JSONEachRow`, (err, data) => {
                callbackFn(null , data);
        })
    });

});
*/

//приймає запит у вигляді сроки та віддає дані по цьому запиту
io.on('connection',  (socket) => {
    socket.on('getFields', (db, table, callbackFn) => {
        if (databases.includes(db)) {
            systemDb.query(`SELECT name FROM columns WHERE database = ${db} AND table = ${table} ORDER BY name`, (err, data) => {
                callbackFn({
                    data
                });
            })
        } else {
            const msg = 'database not found';
            err(msg);
            callbackFn({
                error: msg
            })
        }
    });

    socket.on('req', async function( param, callbackFn){
        const rows = await clickhouse.query(param).toPromise();
            callbackFn(null , rows);
    });

});



http.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});