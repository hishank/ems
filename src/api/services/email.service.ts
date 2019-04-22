
const { models } = require('../../mongoose');
const sendGridClass = require('../lib/sendGrid.class').default;
const uuidv1 = require('uuid/v1');

exports.sendEmail = async (to: string, content: string, subject: string) => {
    try {
        const sg = new sendGridClass();
        let html = await sg.generateHTMLBody(content);
        let emailRow = await models.Email.create({

            to,
            content,
            subject,
            status: 1
        });
        console.log("TCL: exports.sendEmail -> emailRow", emailRow);
        return { id: emailRow._id, status: emailRow.status }
    } catch (error) {
        throw error;
    }

}
