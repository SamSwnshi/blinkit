import sendEmail from "../db/sendEmail.js";
import UserModel from "../models/user.models.js";
import bcrypt from "bcrypt";
// import verifyEmailTemplate from "../utlis/veirfyEmailTemplates.js";
import generatedAccessToken from "../utlis/generatedAccessToken.js";
import genertedRefreshToken from "../utlis/generatedRefreshToken.js";
import uploadImage from "../utlis/cloudinary.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "provide email, name, password",
      });
    }

    const user = await UserModel.findOne({ email });

    if (user) {
      return res.json({
        message: "Already register email",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({ name, email, password: hashPassword });

    const save = await newUser.save();

    return res.status(201).json({
      message: "User register successfully",
      data: save,
      error: false,
      success: true,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message, error: true, success: false });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "provide email, password",
      });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not register",
      });
    }

    if (user.status !== "Active") {
      return res.status(400).json({
        message: "Contact to Admin",
      });
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.status(400).json({
        message: "Check your password",
      });
    }

    const accesstoken = await generatedAccessToken(user._id);
    const refreshToken = await genertedRefreshToken(user._id);

    const updateUser = await UserModel.findByIdAndUpdate(user?._id, {
      last_login_date: new Date(),
    });

    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };
    res.cookie("accessToken", accesstoken, cookiesOption);
    res.cookie("refreshToken", refreshToken, cookiesOption);

    return res.json({
      message: "Login successfully",
      error: false,
      success: true,
      data: {
        user,
        accesstoken,
        refreshToken,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
export const logout = async (req, res) => {
  try {
    const userid = req.userId; //middleware

    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    res.clearCookie("accessToken", cookiesOption);
    res.clearCookie("refreshToken", cookiesOption);

    return res.json({
      message: "Logout successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
export const uploadAvatar = async (req, res) => {
  try {
    const userId = req.user.id; // auth middlware
    const image = req.file; // multer middleware

    const upload = await uploadImage(image);

    const updateUser = await UserModel.findByIdAndUpdate(
      userId,
      {
        avatar: upload.url,
      },
      { new: true }
    );
    console.log(updateUser);

    return res.json({
      message: "upload profile",
      success: true,
      error: false,
      data: {
        _id: userId,
        avatar: upload.url,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const userDetails = async (req, res) => {
  try {
    const userId = req.user.id;

    console.log(userId);

    const user = await UserModel.findById(userId).select(
      "-password -refresh_token"
    );

    return res.json({
      message: "user details",
      data: user,
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something is wrong",
      error: true,
      success: false,
    });
  }
};

export const updateUserDetails = async (req, res) => {
  try {
    const userId = req.user?.id; //auth middleware
    const { name, email, mobile, password } = req.body;

    let hashPassword = "";

    if (password) {
      const salt = await bcrypt.genSalt(10);
      hashPassword = await bcrypt.hash(password, salt);
    }

    const updateUser = await UserModel.updateOne(
      { _id: userId },
      {
        ...(name && { name: name }),
        ...(email && { email: email }),
        ...(mobile && { mobile: mobile }),
        ...(password && { password: hashPassword }),
      }
    );

    return res.json({
      message: "Updated successfully",
      error: false,
      success: true,
      data: updateUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
