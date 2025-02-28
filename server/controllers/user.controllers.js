import sendEmail from "../db/sendEmail.js";
import UserModel from "../models/user.models.js";
import bcrypt from "bcrypt";
import verifyEmailTemplate from "../utlis/veirfyEmailTemplates.js"

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return response.status(400).json({
        message: "provide email, name, password",
      });
    }

    const user = await UserModel.findOne({ email });

    if (user) {
      return response.json({
        message: "Already register email",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({ name, email, password: hashPassword });

    const save = await newUser.save();

    const VerifyEmailUrl =  `${process.env.FRONTEND_URL}/verify-email?code=${save?._id}`;

    const verifyEmail = await sendEmail({
        sendTo : email,
        subject : "Verify email from binkeyIt",
        html : verifyEmailTemplate({
            name,
            url : VerifyEmailUrl
        })
    })

    return res.status(201).json({
      message: "User register successfully",
      data: save,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const login = async(req,res) =>{
    
}
export const logout = async(req,res) =>{

}
