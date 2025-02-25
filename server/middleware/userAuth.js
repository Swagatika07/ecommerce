import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import express from 'express';

const app = express();
app.use(cookieParser());

const userAuth = async(req,res,next) => {
    console.log("Cookies", req.cookies);
    const {token} = req.cookies;
    if(!token){
        console.log("No token found in cookies")
        return res.status(401).json({message: "Unauthorized"})
    }
    try {
        const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Token Decoded: ", tokenDecoded);
        if(tokenDecoded){
            req.body.userId = tokenDecoded.id;
        } else {
            console.log("Token verification failed")
            return res.json({message: "Unauthorized"})
        }
        next();
    } catch (error) {
        console.log("Error verifying token",error.message);
        return res.status(401).json({message: "Unauthorized"})
    }
}

export default userAuth;