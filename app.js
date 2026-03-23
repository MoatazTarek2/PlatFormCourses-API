const express=require('express')
const app=express()
const mongoose=require('mongoose')
require('dotenv').config()
const cors=require('cors')
app.use(cors())
app.use(express.json())
const httpstatus=require('./utils/httpstatuse')
const route_user=require('./router/route.user')
const route_courses=require('./router/route.courses')
const route_lessons=require('./router/route.lesson')
const route_Booking=require('./router/route.Booking')
const route_review=require('./router/route.review')
const PORT=process.env.PORT || 2300
const url=process.env.MONGO_URL
mongoose.connect(url).then(()=>{
    console.log('coneccted of database')
})
app.listen(PORT,()=>{
    console.log(`listen in port ${PORT}`)
})
app.use('/api/auth',route_user)
app.use('/api/course',route_courses)
app.use('/api/lesson',route_lessons)
app.use('/api/Booking',route_Booking)
app.use('/api/review',route_review)
app.use((req,res,next)=>{ 
    return res.status(404).json({status:httpstatus.FAIL,message:'NOT FOUND PATH'})
})
app.use((error,req,res,next)=>{
    res.status(error.status || 500).json({status:error.httpstatus||httpstatus.EROR,message:error.message})
}) 