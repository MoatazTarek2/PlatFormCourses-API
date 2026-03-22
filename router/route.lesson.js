const express=require('express')
const route=express.Router()
const services_lesson=require('../services/lessons.services')
const alowedto=require('../middleware/alowedTo')
const verifyToken=require('../middleware/vreifyToken')
route.post('/add',verifyToken,alowedto('instructor'),services_lesson.add_lesson)
route.delete('/delete/:id_lesson',verifyToken,alowedto('admin'),services_lesson.delete_lesson)
module.exports=route