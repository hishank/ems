'use strict';

import * as mongoose from 'mongoose';
const config = require('config');


let MONGO_URI : string = config.MONGO_URI;


(<any>mongoose).Promise = require('bluebird');
mongoose.connect(MONGO_URI, {
socketTimeoutMS: 0,
useCreateIndex: true,
useNewUrlParser: true,
keepAlive: true,
reconnectTries: 30
});
let master = mongoose.connection;
master.on('connected', function() {
console.log('Mongoose master connection open on ' + MONGO_URI);
});

master.on('error', function(err:String) {
console.log('Mongoose master connection error: ', err);
});

master.on('disconnected', function() {
console.log('Mongoose master connection disconnected');
process.exit(0);
});

process.on('SIGINT', function() {           //close connection on process exit
    master.close(function() {
        console.log('Mongoose master connection disconnected through app termination');
        process.exit(0);
    });
});


//set schemas to connection
mongoose.model('Email', require('./emails').Email);

module.exports = {
    connection : master,
    models : mongoose.models
};