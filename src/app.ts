const express = require('express');
const config = require('config');
const swaggerize = require('swaggerize-express');
const PORT = config.PORT || 3000;
const app = express();
const swaggerJSON = require('../config/swagger.json');
swaggerJSON.host = `localhost:${PORT}`
const boom = require('express-boom');
const bodyParser = require('body-parser');
const SwaggerExpress = require('swagger-express-mw');

const handlers = require('./api/controllers');


/////////////////  MIDDLEWARES ///////////////////
app.use(boom());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//SWAGGER MIDDLEWARE
app.use(swaggerize({
    api: swaggerJSON,
    docspath: '/swagger',                                        /// HOST:PORT/BASE_PATH/swagger  to get swagger file
    handlers
}));
//ERROR MIDDLEWARE
app.use(function (err: any, req: object, res: any, next: any) {
    if(err.status && err.details[0]){
        res.status(err.status).send(err.details[0]);
    }else{
        res.status(500).send('Server Error')
    }
    
});
///////////////////////////////////////////////////


app.listen(PORT, () => {
    console.log(`App listening on port ${PORT} on environment ${app.get('env')}`);

});




export default app;

