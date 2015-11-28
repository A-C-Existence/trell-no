var jwt = require ('jsonwebtoken');

exports.authenticate2 = function(req, res, next, app) {
  
  if(req.originalUrl == '/api/login'){
    next();
    return;
  } else if (token = req.headers['x-access-token']) {
    //DECODE TOKEN
    //VERIFIES SECRET CODE AND CHECKS FOR EXPIRATION
    jwt.verify(token, app.get('superSecret'), function (err, decoded) {
      if (err) {
        return res.status(422).json({ success: false, message: 'Failed @ authenticating token.'});
      } else {
        //IF EVERYTHING IS GOOD SAVE ON REQUEST 
        //FOR USE IN OTHER ROUTES
        req.decoded = decoded;
        next();
      }
    });
  } else {
    //IF NO TOKEN 
    // RETURN ERROR
    return res.status(403).send({
        success: false,
        message: 'Token not provided.'
      });
  }
};