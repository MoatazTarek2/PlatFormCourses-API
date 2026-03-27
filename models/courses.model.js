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
CoursesSchema.pre('deleteOne', { document: true, query: true }, async function(next) {
    const Booking_model = require('./Booking.model')
    const lessons_model = require('./lessons.model')
    const review_model = require('./review.model')
    await review_model.deleteMany({ course_id: this._id })
    await Booking_model.deleteMany({ course_id: this._id })
    await lessons_model.deleteMany({ course_id: this._id })
    next();
});
module.exports=mongoose.model('COURSES',CoursesSchema)