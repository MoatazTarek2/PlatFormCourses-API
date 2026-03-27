const joi=require('joi')
const add_Booking_schema=joi.object({
    course_id:joi.string().required(),
    price:joi.number().required(),
    payment_method:joi.string().valid('insta pay','paypal','vodafone cash').required()
})
const update_Booking_schema=joi.object({
    course_id:joi.string(),
    price:joi.number(),
    payment_method:joi.string().valid('insta pay','paypal','vodafone cash')
})
module.exports={
    add_Booking_schema,
    update_Booking_schema
}