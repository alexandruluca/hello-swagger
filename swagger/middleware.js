const swaggerUi = require('swagger-ui-express');
const {Router} = require('express');
const swaggerDocument = require('./api.json');
const swaggerTools = require('x-swagger-tools');
/**
 * Get swagger related middleware
 */
exports.getMiddleware =  async function getMiddleware({controllers}) {
    const router = Router();

    return new Promise((resolve, reject) => {
        let swagger2Spec = swaggerDocument;
        return swaggerTools.initializeMiddleware(swagger2Spec, function (middleware) {
            if (middleware instanceof Error) {
                reject(middleware);
                return;
            }
            
            const swaggerMetadata = middleware.swaggerMetadata();
            const swaggerValidator = middleware.swaggerValidator();
            const swaggerRouter = middleware.swaggerRouter({controllers});

            /* swagger meta data*/
            router.use(swaggerMetadata);
            /* swagger validation*/
            router.use(swaggerValidator);
            /* parse swagger params */
            router.use((req, res, next) => {
                if (req.swagger) {
                    req.swaggerParams = {};
                    for (let paramKey in req.swagger.params) {
                        let param = req.swagger.params[paramKey];

                        req.swaggerParams[paramKey] = param.value;
                    }

                    if (!req.swagger.operation) {
                        return next();
                    }

                    let operationId = req.swagger.operation.operationId;
                    let controllerName = req.swagger.operation['x-swagger-router-controller'];
                }
                next();
            });
            
            router.use(swaggerRouter);

            /* error handling */
            router.use(errorHandler);

            router.use('/api-docs', swaggerUi.serve);
            router.get('/api-docs', swaggerUi.setup(swaggerDocument, {swaggerOptions: getSwaggerUiOptions()}));

            resolve(router);
        });
    });
}

/**
 * Initialize swagger ui options.
 * If authToken is set (should be set only in dev mode), then authorizations will also be enabled
 */
function getSwaggerUiOptions() {
    let swaggerOptions = {
        displayOperationId: true,
    }

    return swaggerOptions;
}

/**
 * Error handler
 * @param err
 * @param req
 * @param res
 * @param next
 */
function errorHandler(err, req, res, next) {
    if (!err) {
        return next();
    }
    let errors = (err.results && err.results.errors) || [];
    if (errors) {
        errors = errors.map(err => {
            if (err.code) {
                err.code = err.code.toLowerCase();
            }
            if (err.message && ['object_missing_required_property', 'object_additional_properties'].includes(err.code)) {
                let props = err.message.split(' ');
                err.path = props[props.length - 1];
            }
            if (Array.isArray(err.path)) {
                err.path = err.path[0];
            }
            return err;
        });
    }
    let statusCode = err.statusCode || 400;
    let errorCode = err.errorCode || (err.code && err.code.toLowerCase());
    let dataOut = {
        data: {
            status: statusCode,
            message: err.toString()
        }
    };
    if (errors && errors.length) {
        dataOut.data.errors = errors;
    }
    if (errorCode) {
        dataOut.data.errorCode = errorCode;
    }
    res.status(statusCode).json(dataOut);
}
