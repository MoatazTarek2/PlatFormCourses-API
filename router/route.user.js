const express=require('express')
const route=express.Router()
const alowedto=require('../middleware/alowedTo')
const userValidation=require('../middleware/user.validtion')
const verifyToken=require('../middleware/vreifyToken')
const services_user=require('../services/user.services')
route.post('/register',userValidation,services_user.register)
route.post('/login',services_user.login)
route.get('/courses',verifyToken,services_user.courses_user)
module.exports=route

