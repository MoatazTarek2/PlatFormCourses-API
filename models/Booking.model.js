const mongoose=require('mongoose')
const BookingSchema=mongoose.Schema({
    user_id:{
         type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'USERS'
    },
    course_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'COURSES'
    },
    payment_method:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
        ref:'COURSES'
    }
})
module.exports=mongoose.model('Booking',BookingSchema)