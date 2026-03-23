const mongoose=require('mongoose')
const ReviewSchema=mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'USERS',

    },
    course_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'COURSES',
        required:true
    },
    comment:[String],
    rating_:{
        type:Number,
        min:1,max:5,
        required:true
    }
})
module.exports=mongoose.model('Review',ReviewSchema)