const myDb = require('../managers/mysql');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport')
const config = require('../config');
const storedForgotCode = require('./forgotCode');
const crypto = require('crypto');

function code(str){
    return crypto.createHash('md5').update(str).digest('hex');
}

async function createUser(data) {
    data.password = c
    return await myDb.createUser({ ...data });
}

async function updateUser(data) {
    data.password = crypto.createHash('md5').update(data.password).digest('hex');
    return await myDb.updateUser({ ...data });
}

async function deleteUser(data) {
    return await myDb.deleteUser({ ...data });
}

async function checkUser(data) {
    data.password = crypto.createHash('md5').update(data.password).digest('hex');
    return await myDb.checkUser({ ...data });
}

async function forgotUser(data) {
    const { userRegisteredId } = await myDb.checkLogin(data);
    if (userRegisteredId) {
        const code = new Date().getTime() + 'code_' + userRegisteredId;
        const transporter = nodemailer.createTransport(config.nodemailer);
        storedForgotCode.set(code);

        const mailOptions = {
            from: 'delta@testserv.com',
            to: data.login,
            subject: 'Reset password',
            text: 'link http://localhost/forgotpassword?token=' + code
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
}

async function remindUser({code}) {
    if (storedForgotCode.check(code)) {
        const id = code.replace(/.*code_/, '');
        return await myDb.getUserData({id});
    } else {
        return {error: 'User Error'}
    }
}

module.exports = { createUser, updateUser, checkUser, deleteUser, forgotUser }