const mongoose=require('mongoose')
const validator=require('validator')
const UserSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },age:{
        type:Number,
        required:true
    },email:{
        type:String,  
        required:true,
        unique:true,
        validate:[validator.isEmail,'invaled path email']
    },password:{
        type:String,
        required:true
    },
    emailresetcode:String,
    emailresetexpire:Date,
    emailresetverify:Boolean,
    passwordchangeAt:Date,
    passwordresetcode:String,
    passwordresetexpire:Date,
    passwordresetverify:Boolean,
    role:{
        type:String, 
        enum:['student','instructor','admin'],
        default:'student'
    }
})
module.exports=mongoose.model('USERS',UserSchema)