'use strict'
const { sendEmail, findEmailById,deleteEmailById } = require('../services/email.service')
const { logger } = require('../lib/logging');

/**
 * POST /emails
 * @param req 
 * @param res 
 */
const postEmail = async (req: any, res: any) => {

    try {
        logger.info("TCL: postEmail -> req");
        const { to, content, subject } = req.body;
        let response = await sendEmail(to, content, subject)
        return res.send({ id: response.id, status: response.status });
    } catch (error) {
        logger.error("TCL: postEmail -> error");
        logger.error(error);
        return res.boom.badImplementation();
    }

}

/**
 * GET /emails/{id}
 * @param req 
 * @param res 
 */
const getEmailById = async (req: any, res: any) => {

    try {
        const { id } = req.params;
        let row = await findEmailById(id);
        if (!row) {
            return res.boom.notFound('Id not found')
        } else {
            res.send(row);
        }
    } catch (error) {
        logger.error("TCL: getEmailById -> error");
        logger.error(error)
        return res.boom.badImplementation();
    }


}


/**
 * DELETE /emails/{id}
 * @param req 
 * @param res 
 */
const removeEmailById = async (req: any, res: any) => {

    try {
        const { id } = req.params;
        let row = await deleteEmailById(id);
		console.log("TCL: removeEmailById -> row", row)
        if (!row) {
            return res.boom.notFound('Id not found')
        } else {
            res.send();
        }
    } catch (error) {
        logger.error("TCL: getEmailById -> error");
        logger.error(error)
        return res.boom.badImplementation();
    }
}



let exportObj = {               //// for swagger get functions from
    '{id}': {
        '$get': getEmailById,
        '$delete': removeEmailById
    },
    '$post': postEmail,

}
export default exportObj