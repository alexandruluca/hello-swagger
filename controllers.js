module.exports = {
    user_sayHello,
    user_createUser
}

function user_sayHello(req, res, next) {
    let firstName = req.swaggerParams.firstName; // or req.swagger.params.firstName.value
    let lastName = req.swaggerParams.lastName; // or req.swagger.params.lastName.value
    
    return res.json({
        hello: `${firstName} ${lastName}`
    })
}

function user_createUser(req, res, next) {
    let user = req.swaggerParams.user;
    
    return res.json(user);
}