const mongoose=require('mongoose')
const LessonSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    course_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'COURSES'
    },
    url:{
        type:String,
        required:true
    }
})
module.exports=mongoose.model('Lessons',LessonSchema)