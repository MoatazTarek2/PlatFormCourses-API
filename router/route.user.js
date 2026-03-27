const express=require('express')
const route=express.Router()
const httpstatus=require('../utils/httpstatuse')
const {register_schema,verifyemail_schema,login_schema,forgotpassword_schema,verifyresetcode_schema,resetpassword_schema}=require('../validation/validtion.user')
const validate=require('../middleware/validate')
const verifyToken=require('../middleware/vreifyToken')
const rateLimit = require('express-rate-limit')
const services_user=require('../services/user.services')
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: {status: httpstatus.FAIL, message: 'Too many login attempts, try again later'}
});
route.post('/register',validate(register_schema),services_user.register)
route.post('/verify-email',validate(verifyemail_schema),services_user.verifyemail)
route.post('/login',loginLimiter,validate(login_schema),services_user.login)
route.post('/refresh-token',services_user.logicRefreshToken)
route.post('/forgotpassword',validate(forgotpassword_schema),services_user.forgotpassword)
route.post('/verify-resetpassword',validate(verifyresetcode_schema),services_user.verifyresetcode)
route.post('/resetpassword',validate(resetpassword_schema),verifyToken,services_user.resetpassword)
module.exports=route