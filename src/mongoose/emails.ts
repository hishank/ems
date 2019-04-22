'use strict';

import {Schema} from 'mongoose';

/**
* Email Schema
*/

exports.Email = new Schema({
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

