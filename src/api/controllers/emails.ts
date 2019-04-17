
'use strict'
/**
 * POST /emails
 * @param req 
 * @param res 
 */
const postEmail = (req: any, res: any) => {
    console.log("TCL: exports.get -> res.boom.", res.boom)
    return res.boom.badRequest('noo');
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