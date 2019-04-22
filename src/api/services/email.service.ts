'use strict'
const { models } = require('../../mongoose');
const sendGridClass = require('../lib/sendGrid.class').default;
// const {logger} = require ('../lib/logging');
const moment = require('moment-timezone')
exports.sendEmail = async (to: string, content: string, subject: string) => {
    
    let sydneyTimeNow =  moment.tz('Australia/Sydney');
    let sydneyTimeEightAM =  moment.tz('Australia/Sydney').hour(8).startOf('hour');
    let sydneyTimeFivePM =  moment.tz('Australia/Sydney').hour(17).startOf('hour');
    let status = 0;
    if(sydneyTimeNow.isBetween(sydneyTimeEightAM,sydneyTimeFivePM)){
        try {
            const sg = new sendGridClass();
            let html = await sg.generateHTMLBody(content);
            sg.sendEmail(to,subject,content,html);
            status = 1
        } catch (error) {       // Failed in case there is an exception
           status = 2;
        }
    }
    
    try {
        let emailRow = await models.Email.create({
            to,
            content,
            subject,
            status
        });
        return { id: emailRow._id, status: emailRow.status }
    } catch (error) {
        throw error;
    }

}

exports.findEmailById = async (id :number) =>{
    try {
        return models.Email.findById(id)
    } catch (error) {
        throw error;
    }
}

exports.deleteEmailById = async (id :number) =>{
    try {
        return models.Email.findByIdAndDelete(id)
    } catch (error) {
        throw error;
    }
}
