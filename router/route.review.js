const express=require('express')
const services_review=require('../services/review.services')
const verifyToken=require('../middleware/vreifyToken')
const route=express.Router()
route.post('/',verifyToken,services_review.add_review)
module.exports=route