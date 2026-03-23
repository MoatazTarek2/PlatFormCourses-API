const asyncWrapper = require('../middleware/asyncWrapper')
const appError=require('../utils/appError')
const Review_model=require('../models/review.model')
const course_model=require('../models/courses.model')
const httpstatus=require('../utils/httpstatuse')
const add_review=asyncWrapper(async(req,res,next)=>{
    const {course_id,comment,rating_}=req.body
    const course=await course_model.findOne({_id:course_id})
        if(!course){
            return next(appError.create('NOT FOUND Course',404,httpstatus.FAIL))
        }
    const review=new Review_model({course_id,comment,rating_,userr_id:req.paylod.id})
    if(rating_){
        course.rating.push(rating_)
        const n = course.rating.length;
        course.rating_count = ((course.rating_count * (n - 1)) + rating_) / n;
        await course.save();
        
    }
    await review.save()
    res.json({status:httpstatus.SUCCESS,data:'done'})
})
module.exports={add_review}