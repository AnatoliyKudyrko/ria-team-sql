let package = require('../package');
module.exports = {
    app: {
        name: package.name,
        version: package.version
    },
    server: {
        port: process.env.NODE_APP_INSTANCE || 8081,
        lifeTime: process.env.NODE_LIFE_TIME || '', // For auto rebooting features use 'ms','m','s','h','d' suffix for this variable, for example 12h
    },
    worker: process.env.NODE_WORKER_NAME,
    clickhouse: {
        url: 'http://localhost',
        port: 8123,
        debug: false,
        basicAuth: null,
        isUseGzip: false,
        format: "json",
        config: {
            session_id                              : 'session_id if neeed',
            session_timeout                         : 60,
            output_format_json_quote_64bit_integers : 0,
            enable_http_compression                 : 0,
        },
    },
    mysql: {
        host: 'localhost',
        port: '3306',
        user: 'admin',
        database: 'delta',
        password: ''
      }
};