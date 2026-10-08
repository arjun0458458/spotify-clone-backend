// Here we write the middlewares which is being used repeatdetly
   // in some part of the codes

   const jwt = require('jsonwebtoken');

 // Since here we r creating middleware, so there will be 3 parameters req,res,next
   async function authArtist(req, res, next){

    const token = req.cookies.token
    if(!token){
        return res.status(401).json({ message: "Unauthorized "})
    }

    try{

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if (decoded.role !== "artist") {
            return res.status(403).json({message: "You don't have access"})
        }
       // we r creating new property under req which is user, and user ki value hogi decoded
        req.user = decoded;

        // If condition not satisfies to hum aage badh jayenge next() ko call karke
        next();// ek middleware se req aage forward ho sake isliye next() ko call karte h

    }
    catch (err) {
        console.log(err);
        return res.status(401).json ({ message: " Unauthorized "})
    }


   }



   //CREATE an authentication on "/" api
   async function authUser(req, res, next){

    const token = req.cookies.token

    if(!token){
        res.status(401).json({message: "Unauthorized"})
    }

    try{

        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        if(decoded.role !== "user") {
            return res.status(403).json({ message: "You don't have access" })
        }

        req.user = decoded;
        next();

    } catch(err) {

        console.log(err);
        return res.status(401).json({ message: "Unauthorized"})
    }
   }



   module.exports = { authArtist, authUser }