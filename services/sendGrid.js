const sgMail = require('@sendgrid/mail');
const keys = require('../config/keys');
const debug = require('debug')('active:app');


sgMail.setApiKey(keys.SENDGRID_API_KEY);

module.exports =  async (msg) => {
   return sgMail.sendMultiple(msg)
};

