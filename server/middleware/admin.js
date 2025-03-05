import UserModel from "../models/user.models.js";

 const admin = async(req,res,next) =>{
    try {
        const userId = req.userId

        const user = await UserModel.findById(userId);

        if(user.role !== 'ADMIN'){
            return response.status(400).json({
                message : "Permission denial",
                error : true,
                success : false
            })
       }

       next()
        
    } catch (error) {
        return response.status(500).json({
            message : "Permission denial",
            error : true,
            success : false
        })
    }
}

export default admin;