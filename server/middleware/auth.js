import jwt from "jsonwebtoken";

const auth = async(req,res,next) =>{

    try {
        const token = req.header("Authorization").split(" ")[1]

        if(!token){
            return res.status(401).json({ message: "Access Denied! No Token Provided" });
        }

        const decoded  = await jwt.verify(token,process.env.JWT_KEY);
        req.user = decoded 
        next()
    } catch (error) {
        return res.status(400).json({ message: "Invalid token" });
    }

}

export default auth;