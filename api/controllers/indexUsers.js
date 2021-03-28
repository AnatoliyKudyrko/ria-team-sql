const myDb = require('../managers/mysql');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport')
const config = require('../config');
const storedForgotCode = require('./forgotCode');
const crypto = require('crypto');

function code(str) {
    return crypto.createHash('md5').update(str).digest('hex');
}

async function createUser(data, cb) {
    const result = await myDb.createUser({ ...data, password: code(data.password) });
    return cb(null,result);
}

async function updateUser(data, cb) {
    if (data.password) {
        data.password = code(data.password);
    }
    return cb(null, await myDb.updateUser({ ...data }));
}

async function deleteUser(data, cb) {
    return cb(null, await myDb.deleteUser({ ...data }));
}

async function checkUser(data, cb) {
    const result = await myDb.checkUser({ ...data, password: code(data.password) })
    cb(null,result);
}

async function forgotUser(data, cb) {
    const { user_id } = await myDb.checkLogin(data);
    if (user_id) {
        const code = new Date().getTime() + 'code_' + user_id;
        const transporter = nodemailer.createTransport(config.nodemailer);
        storedForgotCode.set(code);

        const mailOptions = {
            from: 'delta@testserv.com',
            to: data.login,
            subject: 'Reset password',
            text: 'secret key = ' + code
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                cb({
                    success: false,
                    error
                });
            } else {
                cb({
                    success: true,
                    msg: 'Email sent: ' + info.response
                })
                console.log('Email sent: ' + info.response);
            }
        });
    } else {
        cb(null, {
            success: false,
            msg: 'User isn\'t registered'
        })
    }
}

async function remindUser({ code }, cb) {
    if (storedForgotCode.check(code)) {
        storedForgotCode.clear();
        const user_id = code.replace(/.*code_/, '');
        cb(null, {
            success: true,
            data: await myDb.getUserData({ user_id })
        });
    } else {
        cb(null, {
            msg: 'User Error',
            success: false
        })
    }
}

module.exports = { createUser, updateUser, checkUser, deleteUser, forgotUser, remindUser }