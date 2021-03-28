const {createUser, updateUser, deleteUser, checkUser, forgotUser, remindUser} = require ('../controllers/indexUsers');
const {createQuery, updateQuery, selectQueries} = require('../controllers/indexQuery');
const err = require('../helpers/error');
const { ClickHouse } = require('clickhouse');
const config = require('./config'),
    err = require('./helpers/error');
const slonDb = new ClickHouse({...config.clickhouse, config: { database: 'slon'}});
const mviewsDb = new ClickHouse({...config.clickhouse, config: { database: 'mviews'}});

const fullDbs = new ClickHouse({...config.clickhouse});
const systemDb = new ClickHouse({...config.clickhouse, config: { database: 'system'}});
const databases = ['slon', 'mviews'];

const clickhouse = new ClickHouse({...config.clickhouse});


module.exports = function (socket) {
    socket.on('getFields', (db, table, callbackFn) => {
        if (databases.includes(db)) {
            systemDb.query(`SELECT name FROM columns WHERE database = '${db}' AND table = '${table}' ORDER BY name`, (err, data) => {
               // const res = data ? data.map(namer).filter(dateFilter).map(item=>{return {name:item}}) : null;
                const res = data ? data.map(namer).map(item=>{return {name:item}}) : null;
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
                callbackFn(res);
            });
            
    });
    
    
    socket.on('reqData', async function( param, callbackFn){
        const rows = await clickhouse.query(param).toPromise();
        const columns = Object.getOwnPropertyNames(rows[0]).map(item=>{return{
            field: item, headerName:item, width: 150
        }})
        callbackFn(null,{columns,rows});
    });
    
    socket.on('reqDate', async function({field,table,dataFrom,dataTo}, callbackFn){
        const rows = await clickhouse.query(`Select ${field} from ${table} where toYYYYMMDD(EventDate) BETWEEN ${Number(dataFrom.replace(/-/g, ''))} and ${Number(dataTo.replace(/-/g, ''))} limit 1000`).toPromise();
        const columns = Object.getOwnPropertyNames(rows[0]).map(item=>{return{
            field: item, headerName:item, width: 150
        }})
        callbackFn(null,{columns,rows});
    });
    
    socket.on('reqDays', async function({field,table,day}, callbackFn){
            const rows = await clickhouse.query(`select ${field} from ${table} where EventDate > today()-${day} limit 1000`).toPromise();
            const columns = Object.getOwnPropertyNames(rows[0]).map(item=>{return{
                field: item, headerName:item, width: 150
            }})
            callbackFn(null,{columns,rows});
    });

    socket.on('createUser', createUser);
    socket.on('updateUser', updateUser);
    socket.on('checkUser', checkUser);
    socket.on('forgotUser', forgotUser);
    socket.on('remindUser', remindUser);

    socket.on('createQuery', createQuery);
    socket.on('updateQuery', updateQuery);
    socket.on('selectQueries', selectQueries);
    
}
