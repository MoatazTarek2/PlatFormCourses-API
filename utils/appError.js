class AppError extends Error{
    constructor(){
        super()
    }
    create(message,status,httpstatus){
        this.message=message
        this.status=status
        this.httpstatus=httpstatus
        return this
    }
}
module.exports=new AppError