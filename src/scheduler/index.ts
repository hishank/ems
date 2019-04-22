const cron = require('node-cron');
const emailScheduler  = require('./emailScheduler')


// cron.schedule('0 8 * * *',emailScheduler.sendQueuedEmails,undefined,true,'Australia/Sydney');
cron.schedule('* * * * *',emailScheduler.sendQueuedEmails);