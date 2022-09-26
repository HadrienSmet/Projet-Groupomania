const jwt = require('jsonwebtoken');
require('dotenv').config();

//Try catch aloowing us to certified the user's authentification
//Compares the id from the request and the one from the authorisation token
//If succes the API goes to the next middleware
module.exports = (req, res, next) => {
   try {
    console.log(req.headers.authorization);
       const token = req.headers.authorization.split(' ')[1];
       const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
       const userId = decodedToken.userId;
       req.auth = {
           userId: userId
       };
	next();
   } catch(error) {
       res.status(401).json({ error });
   }
};