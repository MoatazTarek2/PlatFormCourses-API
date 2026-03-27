const joi=require('joi')
const add_course_schema=joi.object({
    title:joi.string().min(3).max(100).required(),
    price:joi.number().required(),
    category:joi.string().min(3).max(50).required()
})
const update_course_schema=joi.object({
    title:joi.string().min(3).max(100),
    price:joi.number(),
    category:joi.string().min(3).max(50)
})
module.exports={
    add_course_schema,
    update_course_schema
}