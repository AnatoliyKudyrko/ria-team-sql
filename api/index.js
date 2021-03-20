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

const PORT = 4000;
const io = require('socket.io')(http,{
    cors: {
        origin: '*',
    }
});

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
//csystemDb.query(`SELECT name FROM columns`, (err, data) => {    console.log(data);})

//приймає запит у вигляді сроки та віддає дані по цьому запиту
function namer(item, index) { 
    return item.name;
}

function dateFilter(item) {
    return !(['EventDate','HourDate', 'MinuteDate', 'SecondDate', 'date_time'].includes(item))  
}

io.on('connection',  (socket) => {
    socket.on('getFields', (db, table, callbackFn) => {
        if (databases.includes(db)) {
            systemDb.query(`SELECT name FROM columns WHERE database = '${db}' AND table = '${table}' ORDER BY name`, (err, data) => {
                const res = data ? data.map(namer).filter(dateFilter) : null;
                console.log(res);
                callbackFn(res);
            })
        } else {
            const msg = 'database not found';
            err(msg);
            callbackFn({
                error: msg
            })
        }
    });


   socket.on('getTables', (callbackFn) => {
        const prom1 = new Promise((res, rej) => {
            systemDb.query(`SELECT name FROM tables WHERE database = 'mviews'`, (err, data) => {
                res( data.map(namer));
            })
        });
        const prom2 = new Promise((res, rej) => {
            systemDb.query(`SELECT name FROM tables WHERE database = 'slon'`, (err, data) => {
                res( data.map(namer));
            })
        });
        Promise.all([prom1, prom2]).then(values => {
            callbackFn({
                mviews: values[0],
                slon: values[1]
            });
        })
    });

    socket.on('getData', (params, callbackFn) => {
        const fields = params.fields.join(',');
        const pageSize = params.page || 30;
        const shift = params.page ? (params.page - 1) * pageSize : 0;
        const grouper = params.group || '';
        const tables = Array.from(new Set(params.fields.map(field => field.replace(/\.[^\.]*$/, '')))).join(',');
            fullDbs.query(`SELECT ${fields} FROM ${tables} LIMIT ${shift}, ${pageSize} GROUP BY ${grouper}`, (err, data) => {
                const res = data || null;
                console.log(res);
                callbackFn(res);
            });
            
    });


    socket.on('req', async function( param, callbackFn){
        const rows = await clickhouse.query(param).toPromise();
        const columns = Object.getOwnPropertyNames(rows[0]).map(item=>{return{
            field: item, headerName:item, width: 150
        }})
            callbackFn({columns,rows});
    });
});




http.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});