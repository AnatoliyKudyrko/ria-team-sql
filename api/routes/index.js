const {createUser, updateUser, checkUser, forgotUser, remindUser} = require ('../controllers/indexUsers');
const {createQuery, updateQuery, selectQueries} = require('../controllers/indexQuery');
const { ClickHouse } = require('clickhouse');
const config = require('../config');
const {removeQuery} = require("../controllers/indexQuery");
const slonDb = new ClickHouse({...config.clickhouse, config: { database: 'slon'}});
const mviewsDb = new ClickHouse({...config.clickhouse, config: { database: 'mviews'}});

const fullDbs = new ClickHouse({...config.clickhouse});
const systemDb = new ClickHouse({...config.clickhouse, config: { database: 'system'}});
const databases = ['slon', 'mviews'];

const clickhouse = new ClickHouse({...config.clickhouse});


module.exports = function (socket) {

    function namer(item, index) {
        return item.name;
    }

    socket.on('getFields', (db, table, callbackFn) => {
        if (databases.includes(db)) {
            systemDb.query(`SELECT name FROM columns WHERE database = '${db}' AND table = '${table}' ORDER BY name`, (err, data) => {
               // const res = data ? data.map(namer).filter(dateFilter).map(item=>{return {name:item}}) : null;
                const res = data ? data.map(namer).map(item=>{return {name:item}}) : null;
                callbackFn({test:'test'},res);
            })
        } else {
            const msg = 'database not found';
            err(msg);
            callbackFn(null, {
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
            callbackFn(null, {
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

    /*
        input:
        { login, password, first_name, last_name }
        output:
            {
                success: true,
                data:  { login, first_name, last_name, user_id },
                msg: `${login} is created`
            } or
            {
                success: false,
                msg: `${login} is already present`
            }
        */ 
    socket.on('createUser', createUser);
    /*
        input:
        { user_id, login, password(optional), first_name, last_name }
        output:
            {
                success: true,
                data: { login, first_name, last_name, user_id },
                msg: `${login} is updated`
            }
        */    
    socket.on('updateUser', updateUser);

        /*
        input:
        { login, password }
        output:
            {
                data: { login, first_name, last_name, user_id },
                success: true
            }
            or 
            {
                user_id: user_id || null,
                success: false,
                msg
            }
        */ 
    socket.on('checkUser', checkUser);

    /*
        input:
        { login }
        output:
            {
                success: true,
                msg: 'Email sent: ' + info.response
            }
        */ 
    socket.on('forgotUser', forgotUser);

/*
        input:
        { code }
        output:
             {
                success: true,
                data: {user_id, login, first_name, last_name} 
             }
        */ 
    socket.on('remindUser', remindUser);

    
/*
        input:
        { user_id, request_query, request_query_name }
        output:
             {
                success: true,
                data: { request_id, user_id, request_query_name, request_query, request_date } 
                msg: `${request_query_name} is created` 
            }
        */ 
    socket.on('createQuery', createQuery);

/*
        input:
        { request_id, request_query, request_query_name }
        output:
             {
                success: true,
                data: { request_id, request_query_name, request_query, request_date } 
                msg: `${request_query_name} is updated` 
            }
        */ 
    socket.on('updateQuery', updateQuery);

    /*
      input:
        { user_id }
        output:
            {
                success: true,
            }
    */
    socket.on('selectQueries', selectQueries);
    socket.on('removeQuery', removeQuery);
    
}
