const joi=require('joi')
const httpstatus=require('../utils/httpstatuse')
const user_validation_schema=joi.object({
    name:joi
    .string()
    .min(3)
    .max(50)
    .required(),
    age:joi.number().required(),
    email:joi.string().email().required(),
    password:joi.string().min(3).required()
})
const verify=(req,res,next)=>{
    const {error}=user_validation_schema.validate(req.body)
    if(error){
        return res.status(400).json({status:httpstatus.EROR,message:error.details[0].message})
    }
    next()
}
module.exports=verify