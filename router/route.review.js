const express=require('express')
const services_review=require('../services/review.services')
const add_review_schema=require('../validation/validtion.review')
const validate=require('../middleware/validate')
const verifyToken=require('../middleware/vreifyToken')
const route=express.Router()
route.post('/',validate(add_review_schema),verifyToken,services_review.add_review)
module.exports=route