const joi=require('joi')
const add_review_schema=joi.object({
    course_id:joi.string().required(),
    rating_:joi.number().min(1).max(5),
    comment:joi.string().min(3).max(500)
})
module.exports=add_review_schema