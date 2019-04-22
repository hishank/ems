import { Model } from "mongoose";

const {logger} = require('../api/lib/logging')
const { models } = require('../mongoose');
const sendGridClass = require('../api/lib/sendGrid.class').default;
exports.sendQueuedEmails = async () =>{
    logger.info('RUNNING EMAIL SCHEDULE');
    try {
        let queuedEmails = await models.Email.find({status:0});
        const sg = new sendGridClass();
        for (const email of queuedEmails) {
            const {to,subject,content,id} = email;
            try {
                let html = await sg.generateHTMLBody(content);
                let data = await sg.sendEmail(to,subject,content,html);
				console.log("TCL: exports.sendQueuedEmails -> data", data)
            } catch (error) {
                logger.error('Error sending email to - '+to)
                logger.error(error);
                continue;       //move onto the next if there is an issue
            }
            await models.Email.findByIdAndUpdate(id,{
                status : 1
            });
     
        }

    } catch (error) {
        logger.error('sendQueuedEmails');
        logger.error(error);
    }
    logger.info('ENDING EMAIL SCHEDULE');
}