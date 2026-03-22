const JWT=require('jsonwebtoken')
const httpstatus=require('../utils/httpstatuse')
const appError = require('../utils/appError')
const verifyToken=(req,res,next)=>{
    const auth=req.headers['Authorization'] || req.headers['authorization']
    if(!auth){return next(appError.create('NOT FOUND Token',404,httpstatus.FAIL))}
    const token = auth.split(' ')[1]
    try {
        const decoded= JWT.verify(token,process.env.Moataz101)
        req.paylod=decoded
        next()
    }
    catch (err){
        const error=appError.create('Invalid token',401,httpstatus.EROR)
        return next(error)
    }

}
module.exports=verifyToken