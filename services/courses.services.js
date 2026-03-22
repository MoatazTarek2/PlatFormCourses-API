const asyncWrapper = require('../middleware/asyncWrapper')
const appError=require('../utils/appError')
const course_model=require('../models/courses.model')
const lessons_model=require('../models/lessons.model')
const Booking_model=require('../models/Booking.model')
const user_model=require('../models/user.model')
const httpstatus=require('../utils/httpstatuse')
const get_all_courses=asyncWrapper(async(req,res)=>{
    const courses=await course_model.find()
    res.json({status:httpstatus.SUCCESS,data:{courses}})
})
const add_course=asyncWrapper(async(req,res,next)=>{
    const {title,price,category}=req.body
    const oldcourse=await course_model.findOne({title:title})
    if(oldcourse){
        return next(appError.create('Course alerady exists',401,httpstatus.FAIL))
    }
    const course=await new course_model({title,price,category,instructor:req.paylod.id})
    await course.save()
    res.json({status:httpstatus.SUCCESS,data:'done'})
}) 
const get_course=asyncWrapper(async(req,res,next)=>{ 
    const id_course=req.params.id_course
    const course=await course_model.findOne({_id:id_course}).populate('instructor', 'name email')
    if(!course){
        return next(appError.create('NOT FOUND',404,httpstatus.FAIL))
    }
    res.json({status:httpstatus.SUCCESS,data:{course}})
})
const delete_course=asyncWrapper(async(req,res,next)=>{
    const id_course=req.params.id_course
    const course=await course_model.findOne({_id:id_course})
    if(!course){
        return next(appError.create('NOT FOUND',404,httpstatus.FAIL))
    }
    await course_model.deleteOne({_id:id_course})
    res.json({status:httpstatus.SUCCESS,data:"delete done"})
})
const update_course=asyncWrapper(async(req,res,next)=>{
    const id_course=req.params.id_course
    const course=await course_model.findOne({_id:id_course})
    if(!course){
        return next(appError.create('NOT FOUND',404,httpstatus.FAIL))
    }
    await course_model.updateOne({_id:id_course},{$set:{...req.body}})
    res.json({status:httpstatus.SUCCESS,data:'update done'})

})
const lesson_course=asyncWrapper(async(req,res,next)=>{
    const id_course=req.params.id_course
    const id_lesson=req.params.id_lesson
    const course=await course_model.findById(id_course)
    if(!course){
        return next(appError.create('NOT FOUND Course',404,httpstatus.FAIL))
    }
    if(req.paylod.role=='student'){
        const Booking=await Booking_model.findOne({user_id:req.paylod.id,course_id:course._id})
    if(!Booking){
        return next(appError.create('The Course Has Not Booked',400,httpstatus.FAIL))
    }
    }
    const lesson=await lessons_model.findById(id_lesson)
    if(!lesson){
        return next(appError.create('NOT FOUND lessons',404,httpstatus.FAIL))
    }
    res.json({status:httpstatus.SUCCESS,data:lesson.url})
})
const lessons_course=asyncWrapper(async(req,res,next)=>{
    const id_course=req.params.id_course
    const course=await course_model.findOne({_id:id_course})
    if(!course){
        return next(appError.create('NOT FPUND Course',404,httpstatus.FAIL))
    }
    const lessons=await lessons_model.find({course_id:id_course})
    if(!lessons){
        return next(appError.create('NOT FOUND lessons',404,httpstatus.FAIL))
    }
    res.json({status:httpstatus.SUCCESS,data:{lessons}})
})
module.exports={
    get_all_courses,
    add_course,
    get_course,
    delete_course,
    update_course,
    lesson_course,
    lessons_course
}