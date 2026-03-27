const joi=require('joi')
const register_schema=joi.object({
    name:joi
    .string()
    .min(3)
    .max(50)
    .required(),
    age:joi.number().required(),
    email:joi.string().email().required(),
    password:joi.string().min(3).required(),
    role:joi.string().valid('student','instructor')
})
const verifyemail_schema=joi.object({
    email:joi.string().email().required(),
    resetcode:joi.string().required()
})
const login_schema=joi.object({
    email:joi.string().email().required(),
    password:joi.string().min(3).required()
})
const forgotpassword_schema=joi.object({
    email:joi.string().email().required()
})
const verifyresetcode_schema=joi.object({
    email:joi.string().email().required(),
    resetcode:joi.string().required()
})
const resetpassword_schema=joi.object({
    newwpassword:joi.string().min(3).required()
})
module.exports={
    register_schema,
    verifyemail_schema,
    login_schema,
    forgotpassword_schema,
    verifyresetcode_schema,
    resetpassword_schema

}