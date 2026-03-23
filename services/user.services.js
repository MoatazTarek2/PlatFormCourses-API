const asyncWrapper = require('../middleware/asyncWrapper')
const AppError = require('../utils/appError')
const user_model=require('../models/user.model')
const course_model=require('../models/courses.model')
const httpstatuse=require('../utils/httpstatuse')
const bcrypt=require('bcryptjs')
const JWT=require('jsonwebtoken')
const appError = require('../utils/appError')
const register=asyncWrapper(async(req,res,next)=>{
    const {name,email,age,password,role}=req.body
    const olduser=await user_model.findOne({email:email})
    if(olduser){
        return next(AppError.create('user alerady exists',401,httpstatuse.FAIL))
    }
    const hashpassword=await bcrypt.hash(password,8)
    const user=new user_model({name,email,age,password:hashpassword,role})
    const token=JWT.sign({email:user.email,id:user._id,role:user.role},process.env.Moataz101,{expiresIn:'14d'})
    await user.save()
    res.json({status:httpstatuse.SUCCESS,data:'user done',token:token})

})
const login=asyncWrapper(async(req,res,next)=>{
    const {email,password}=req.body
    const user=await user_model.findOne({email:email})
    if(!user){
        return next(AppError.create('Invalid Email',401,httpstatuse.FAIL))
    }
    const comparepassword=await bcrypt.compare(password,user.password)
    if(!comparepassword){
        return next(AppError.create('Invalid Pssword',401,httpstatuse.FAIL))
    }
    const token=JWT.sign({email:user.email,id:user._id,role:user.role},process.env.Moataz101,{expiresIn:'14d'})
    res.json({status:httpstatuse.SUCCESS,token:token})
})
const courses_user=asyncWrapper(async(req,res,next)=>{
    const user=await user_model.findOne({_id:req.paylod.id})
    if(!user){
        return next(appError.create('NOT FOUND User',404,httpstatuse.FAIL))
    }
    const courses=await course_model.find({user_id:req.paylod.id})
    if(!courses){
        return next(appError.create('NOT FOUND Courses',404,httpstatuse.FAIL))
    }
    res.json({status:httpstatuse.SUCCESS,data:{courses}})
})
module.exports={
    register,
    login,
    courses_user
}