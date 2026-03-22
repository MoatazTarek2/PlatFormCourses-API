const httpstatus = require("../utils/httpstatuse")
const alowedto=(...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.paylod.role)){return res.status(401).json({status:httpstatus.EROR,message:'NOT Alowed'})}
        next()
    }
}
module.exports=alowedto