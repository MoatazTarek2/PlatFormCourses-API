const express=require('express')
const route=express.Router()
const httpstatus=require('../utils/httpstatuse')
const userValidation=require('../middleware/user.validtion')
const verifyToken=require('../middleware/vreifyToken')
const rateLimit = require('express-rate-limit')
const services_user=require('../services/user.services')
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: {status: httpstatus.FAIL, message: 'Too many login attempts, try again later'}
});
route.post('/register',userValidation,services_user.register)
route.post('/login',loginLimiter,services_user.login)
route.get('/courses',verifyToken,services_user.courses_user)
module.exports=route