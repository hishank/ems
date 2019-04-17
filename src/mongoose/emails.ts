'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
* Email Schema
*/

exports.Email = new Schema({
    emailRequestId: {
        type: String,
        default: null
    },
    to: {
        type: String,
        default: null
    },
    subject: {
        type: String,
        default: null
    },
    content: {
        type: String,
        default: null
    },
    status: { /// 0 - QUEUED , 1 - SENT , 2 - FAILED
        type: Number,
        default: 1
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

