const asyncWrapper = require('../middleware/asyncWrapper')
const appError=require('../utils/appError')
const Booking_model=require('../models/Booking.model')
const courses_model=require('../models/courses.model')
const httpstatus=require('../utils/httpstatuse')
const get_all_Booking=asyncWrapper(async(req,res,next)=>{
    const Bookings=await Booking_model.find().populate('user_id','email').populate('course_id','title')
    if(!Bookings){
        return next(appError.create('NOT FOUND',404,httpstatus.FAIL))
    }
    res.json({status:httpstatus.SUCCESS,data:{Bookings}})
})
const get_Booking=asyncWrapper(async(req,res,next)=>{
    const id_Booking=req.params.id_Booking
    const Booking=await Booking_model.findById(id_Booking).populate('user_id','email').populate('course_id','title')
    if(!Booking){
        return next(appError.create('NOT FOUND',404,httpstatus.FAIL))
    }
    res.json({status:httpstatus.SUCCESS,data:{Booking}})
})
const add_Booking=asyncWrapper(async(req,res,next)=>{
    const {course_id,price,payment_method}=req.body
    const course=await courses_model.findOne({_id:course_id})
    if(!course){
        return next(appError.create('NOT FOUND Course',400,httpstatus.FAIL))
    }
    if(price!=course.price){
        return next(appError.create('the course price '+course.price,400,httpstatus.FAIL))
    }
    const old_course_user=await Booking_model.findOne({
        course_id:course_id,
        user_id:req.paylod.id})
    if(old_course_user){
        return next(appError.create('you have a course',400,httpstatus.FAIL))
    }
    const Booking=new Booking_model({course_id,price,payment_method,user_id:req.paylod.id})
    course.student_count+=1
    await Booking.save()
    await course.save()
    res.json({status:httpstatus.SUCCESS,data:'done'})
})
const delete_Booking=asyncWrapper(async(req,res,next)=>{
    const id_Booking=req.params.id_Booking
    const Booking=await Booking_model.findOne({_id:id_Booking})
    if(!Booking){
        return next(appError.create('NOT FOUND',404,httpstatus.FAIL))
    }
    await Booking_model.deleteOne({_id:id_Booking})
    res.json({status:httpstatus.SUCCESS,data:'deleted'})
})    
module.exports={
    get_all_Booking,
    get_Booking,
    add_Booking,
    delete_Booking
}  