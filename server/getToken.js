import jwt from "jsonwebtoken";
import genError from "./error.js";

const getToken = (req,res,next)=>{
    const token = req.cookies.access_token
    if(!token) return next(genError(401,"UNAUTHENTICATED USER"))

    jwt.verify(token, process.env.JWT, (err,user)=>{
        if(err) return next(genError(403,"INVALID USER"))
        req.user = user
        next()
    })
}
export default getToken