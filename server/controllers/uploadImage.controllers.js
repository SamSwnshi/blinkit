import uploadImage from "../utlis/cloudinary.js"
const uploadImageControllers = async(req,res) =>{
    try {
        const file = req.file

        const uploadImageFile = await uploadImage(file)

        return res.json({
            message : "Upload done",
            data : uploadImageFile,
            success : true,
            error : false
        })
    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

export default uploadImageControllers