const joi=require('joi')
const add_lesson_schema=joi.object({
    title:joi.string().min(3).max(100).required(),
    course_id:joi.string().required(),
    url:joi.string().uri().required()
})
const update_lesson_schema=joi.object({
    title:joi.string().min(3).max(100),
    course_id:joi.string(),
    url:joi.string().uri()
})
module.exports={
    add_lesson_schema,
    update_lesson_schema
}