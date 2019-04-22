'use strict'
const {sendEmail} = require('../services/email.service')


/**
 * POST /emails
 * @param req 
 * @param res 
 */
const postEmail = async(req: any, res: any) => {
    // console.log("TCL: postEmail -> req", req);
    try {
        const {to,content,subject} = req.body;
        let response = await sendEmail(to,content,subject)
        return res.send(response)
    } catch (error) {
		console.log("TCL: postEmail -> error", error)
        return res.boom.badImplementation();
    }

}

/**
 * GET /emails/{id}
 * @param req 
 * @param res 
 */
const getEmailById = (req: any, res: any) => {
    console.log("TCL: exports.get -> res.boom.", res.boom)
    return res.boom.unauthorized('noo');
}


/**
 * DELETE /emails/{id}
 * @param req 
 * @param res 
 */
const deleteEmailById = (req: any, res: any) => {
    console.log("TCL: exports.get -> res.boom.", res.boom)
    return res.boom.unauthorized('noo');
}



let exportObj = {               //// for swagger get functions from
    '{id}': {                  
        '$get': getEmailById,
        '$delete': deleteEmailById         
    },
    '$post': postEmail,         
 
}
export default exportObj