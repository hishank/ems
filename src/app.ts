
process.env.TZ='utc' ;
const express = require('express');
const config = require('config');
const swaggerize = require('swaggerize-express');
const PORT = config.PORT || 3000;
const app = express();
const swaggerJSON = require('../config/swagger.json');
swaggerJSON.host = `localhost:${PORT}`
const boom = require('express-boom');
const bodyParser = require('body-parser');
require('./mongoose')
const handlers = require('./api/controllers');
const swaggerUi = require('swagger-ui-express');
const {winstonMiddleware} = require ('./api/lib/logging');
console.log("TCL: winstonMiddleware", winstonMiddleware)

app.use(winstonMiddleware)
app.use(boom());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJSON));
app.use(swaggerize({
    api: swaggerJSON,
    docspath: '/swagger',                                        /// HOST:PORT/BASE_PATH/swagger  to get swagger file
    handlers
}));

app.use(function (err: any, req: object, res: any, next: any) {
    if(err.status && err.details && err.details.length){
        res.status(err.status).send(err.details[0]);
    }else{
        res.status(500).send('Server Error')
    }
    
});


app.listen(PORT, () => {
    console.log(`App listening on port ${PORT} on environment ${app.get('env')}`);

});

export default app;

