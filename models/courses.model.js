const mongoose=require('mongoose')
const CoursesSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },price:{
        type:Number,
        required:true,
        default: 0
    },category:{
        type:String,
        required:true
    },instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'USERS'
  },
  student_count:{
    type:Number,
    default:0
  },
  rating:{
    type:[Number],
    default:[]
  },
  rating_count:{
    type:Number,
    default:0
  }
})
module.exports=mongoose.model('COURSES',CoursesSchema)