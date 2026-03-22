const asyncWrapper = require('../middleware/asyncWrapper')
const appError=require('../utils/appError')
const lessons_model=require('../models/lessons.model')
const course_model=require('../models/courses.model')
const httpstatus=require('../utils/httpstatuse')
const add_lesson=asyncWrapper(async(req,res,next)=>{
    const data=req.body
    const oldlesson=await lessons_model.findOne({url:data.url})
    if(oldlesson){
        return next(appError.create('lesson already exists',401,httpstatus.FAIL))
    }
    const course=await course_model.findOne({_id:data.course_id})
    if(!course){
        return next(appError.create('NOT FOUND Course',404,httpstatus.FAIL))
    }
    const lesson=await new lessons_model(data)
    await lesson.save()
    res.json({status:httpstatus.SUCCESS,data:'done'})   
})
const delete_lesson=asyncWrapper(async(req,res,next)=>{
    const id_lesson=req.params.id_lesson
    const lesson=await lessons_model.findOne({_id:id_lesson})
    if(!lesson){
        return next(appError.create('NOT FOUND',404,httpstatus.FAIL))
    }
    await lessons_model.deleteOne({_id:id_lesson})
    res.json({status:httpstatus.SUCCESS,data:'deleted'})
})
module.exports={
    add_lesson,
    delete_lesson
}