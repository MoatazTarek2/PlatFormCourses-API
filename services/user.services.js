const asyncWrapper = require('../middleware/asyncWrapper')
const AppError = require('../utils/appError')
const user_model=require('../models/user.model')
const course_model=require('../models/courses.model')
const sendEmail=require('../utils/sendEmail')
const httpstatuse=require('../utils/httpstatuse')
const bcrypt=require('bcryptjs')
const JWT=require('jsonwebtoken')
const appError = require('../utils/appError')
const register=asyncWrapper(async(req,res,next)=>{
    await user_model.deleteMany({
    emailresetverify: false,
})
    const {name,email,age,password,role}=req.body
    const olduser=await user_model.findOne({email:email})
    if(olduser){
        return next(AppError.create('user alerady exists',401,httpstatuse.FAIL))
    }
    const hashpassword=await bcrypt.hash(password,8)
    const user=new user_model({name,email,age,password:hashpassword,role})
    await user.save()
    const resetcode=Math.floor(100000 + Math.random() * 900000).toString()
    const hashresetcode=await bcrypt.hash(resetcode,8)
    user.emailresetcode=hashresetcode
    user.emailresetexpire=Date.now()+10*60*1000
    user.emailresetverify=false
    await user.save()
    const message=`Hi ${name},\n\nThank you for registering at Skillify! To complete your registration, please verify your email address using the following code:\n\n${resetcode}\n\nThis code is valid for 10 minutes.\n\nIf you did not register for an account, please ignore this email.\n\nBest regards,\nThe Skillify Team`
    try{
        await sendEmail({
            email: email,
            subject: 'Welcome to Skillify! Please verify your email',
            message: message
        })
    } catch (error) {
        user.emailresetcode=undefined
        user.emailresetexpire=undefined
        user.emailresetverify=false
        await user.save()
        return next(AppError.create('Error sending email >> '+error.message,500,httpstatuse.FAIL))
    }
    res.json({status:httpstatuse.SUCCESS,data:'User registered successfully, please check your email to verify your account'})

})
const verifyemail=asyncWrapper(async(req,res,next)=>{
    const {email,resetcode}=req.body
    const user=await user_model.findOne({email:email})
    if(!user){
        return next(AppError.create('Invalid Email',404,httpstatuse.FAIL))
    }
    const comparecode=await bcrypt.compare(resetcode,user.emailresetcode)
    if(!comparecode){
        return next(AppError.create('Invalid reset code',400,httpstatuse.FAIL))
    }
    if(user.emailresetexpire<Date.now()){
        return next(AppError.create('Reset code expired',400,httpstatuse.FAIL))
    }
    user.emailresetverify=true
    await user.save()
    const accesstoken=JWT.sign({email:user.email,id:user._id,role:user.role},process.env.Moataz101,{expiresIn:'2h'})
    const refreshtoken=JWT.sign({email:user.email,id:user._id,role:user.role},process.env.Moataz101,{expiresIn:'30d'})
    res.cookie("refreshToken", refreshtoken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict"
    })
    res.json({status:httpstatuse.SUCCESS,data:'Email verified successfully User Done ',accesstoken:accesstoken})
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
    const accesstoken=JWT.sign({email:user.email,id:user._id,role:user.role},process.env.Moataz101,{expiresIn:'2h'})
    const refreshtoken=JWT.sign({email:user.email,id:user._id,role:user.role},process.env.Moataz101,{expiresIn:'30d'})
    res.cookie("refreshToken", refreshtoken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict"
    });
    res.json({status:httpstatuse.SUCCESS,accesstoken:accesstoken})
})
const logicRefreshToken = async(req,res)=>{
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        return res.status(401).json({ status: 'fail', message: 'No refresh token provided' });
    }
    try {
        const decoded = JWT.verify(refreshToken, process.env.Moataz101);
        req.paylod = decoded;
        const newAccessToken = JWT.sign({ email: decoded.email, id: decoded.id, role: decoded.role }, process.env.Moataz101, { expiresIn: '2h' });
        res.json({ status: 'success', accessToken: newAccessToken });
    }
    catch (err) {
        return res.status(403).json({ status: 'fail', message: 'Invalid refresh token' });
    }
}
const forgotpassword=asyncWrapper(async(req,res,next)=>{
     const {email}=req.body
    const user=await user_model.findOne({email:email})
    if(!user){
        return next(appError.create('Invalid Email',404,httpstatuse.FAIL))
    }
    const resetcode=Math.floor(100000 + Math.random() * 900000).toString()
    const hashresetcode=await bcrypt.hash(resetcode,8)
    user.passwordresetcode=hashresetcode
    user.passwordresetexpire=Date.now()+10*60*1000
    user.passwordresetverify=false
    await user.save()
   try{
        const message=`HI ${user.name}, \nyou have requested to reset your password \nyour reset code is: ${resetcode} \n this code is valid for 10 minutes \nif you did not request this, please ignore this email \nthank you for using our platform`
      await sendEmail({
        email: user.email,
        subject: 'your Password Reset code (valid for 10 minutes)',
        message: message
        })
    }
   catch(err){
    user.passwordresetcode=undefined
    user.passwordresetexpire=undefined
    user.passwordresetverify=false
    await user.save()
    return next(appError.create('Error sending email >> '+err.message,500,httpstatuse.FAIL))
   }
    res.json({status:httpstatuse.SUCCESS,message:'Reset code sent to email'})
})
const verifyresetcode=asyncWrapper(async(req,res,next)=>{
    const {email,resetcode}=req.body
    const user=await user_model.findOne({email:email})
    if(!user){
        return next(appError.create('Invalid Email',404,httpstatuse.FAIL))
    }
    const comparecode=await bcrypt.compare(resetcode,user.passwordresetcode)
    if(!comparecode){
        return next(appError.create('Invalid reset code',400,httpstatuse.FAIL))
    }
    if(user.passwordresetexpire<Date.now()){
        return next(appError.create('Reset code expired',400,httpstatuse.FAIL))
    }
    user.passwordresetverify=true
    await user.save()
    const otpToken=JWT.sign({id:user._id},process.env.Moataz101,{expiresIn:'10m'})
    res.json({status:httpstatuse.SUCCESS,message:'Reset code verified ',otpToken:otpToken})

})
const resetpassword=asyncWrapper(async(req,res,next)=>{
    const {newwpassword}=req.body
    const user=await user_model.findOne({_id:req.paylod.id})
    const hashpassword=await bcrypt.hash(newwpassword,8)
    if(!user.passwordresetverify){
        return next(appError.create('Invalid token',400,httpstatuse.FAIL))
    }
    user.password=hashpassword
    user.passwordchangeAt=Date.now()
    user.passwordresetcode=undefined
    user.passwordresetexpire=undefined
    user.passwordresetverify=false
    await user.save()
    res.json({status:httpstatuse.SUCCESS,message:'Password reset successful'})
})   
module.exports={ 
    register,
    verifyemail,
    login,
    logicRefreshToken,
    forgotpassword,
    verifyresetcode,
    resetpassword,
}