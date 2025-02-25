import bcrypt from "bcryptjs";
import {v2 as cloudinary} from "cloudinary";
import jwt from "jsonwebtoken";
import "dotenv/config";
import userModel from "../models/userModel.js";
import transporter from "../config/nodemailer.js";
import validator from 'validator';
import upload from "../middleware/multer.js";

// Function to validate password strength
const isStrongPassword = (password) => {
  return validator.isStrongPassword(password, {
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  });
};
//Sign up controller function
export const register = async (req, res) => {

  // upload.single('profileImage')(req, res, async (err) => {
  //   if (err) {
  //     console.log(err);
  //     return res.json({ success: false, message: "File upload failed" });
  //   }
  
  const { name, email, password, confirmPassword } = req.body;

  if (!name || !email || !password || !confirmPassword) {
    return res.json({ success: false, message: "Missing Details" });
  }
  if(!isStrongPassword(password)){
    return res.json({ success: false, message: "Password must be 8 characters long and contains atleast 1 uppercase and 1 lowercase character and 1 number and 1 symbol" });
  }

  try {
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.json({ success: false, message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedConfirmPassword = await bcrypt.hash(confirmPassword, 10);
    
   //add that if password and confirmPassword are not same then return error message
    if (password !== confirmPassword) {
      return res.json({ success: false, message: "Password does not match" });
    }
    const profileImage = req.file ? req.file.path : '';

    const user = new userModel({ name, email, password: hashedPassword, confirmPassword: hashedConfirmPassword, profileImage });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" ? true : false,
      // sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
    //token is generating perfectly, and getting stored in the cookies**
    console.log(token);
    //Sending welcome mail
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Welcome to our app",
      text: `Welcome to our ecommerce website. Your account has been created with the email id : ${email}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error sending message: " + error);
      } else {
        // no errors, it worked
        console.log("Message sent succesfully.");
      }
    });
    return res.json({ success: true, message: "Registration successful" });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Something went wrong" });
  }
}


//Login controller function
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({ success: false, message: "Missing Details" });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" ? true : false,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return res.json({ success: true, message: "Login successful" });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Something went wrong" });
  }
};


//Uploading profile image controller function
export const uploadProfileImage = async (req, res) => {
  upload.single('profileImage')(req, res, async (err) => {
    if (err) {
      return res.json({ success: false, message: "File upload failed" });
    }

    const token = req.cookies.token;
    if (!token) {
      return res.json({ success: false, message: "Authentication token is required" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.id;

      const user = await userModel.findById(userId);
      if (!user) {
        return res.json({ success: false, message: "User not found" });
      }
      //Upload image to the cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'profileImages',
        public_id: `${user._id}_profileImage`,
        overwrite: true,
        resource_type: 'image',
      });
      user.profileImage = result.secure_url;
      await user.save();

      return res.json({ success: true, message: "Profile image uploaded successfully", profileImage: result.secure_url });
    } catch (error) {
      console.log(error);
      return res.json({ success: false, message: "Something went wrong" });
    }
  });
}

// export const uploadProfileImage = async (req, res) => {
 
//   upload.single('profileImage')(req, res, async (err) => {
//     if (err) {
//       return res.json({ success: false, message: "File upload failed" });
//     }
    
//     console.log(req.body)
  
//     const { userId } = req.body;
//     if (!userId) {
//       return res.json({ success: false, message: "User ID is required" });
//     }

//     try {
//       const user = await userModel.findById(userId);
//       if (!user) {
//         return res.json({ success: false, message: "User not found" });
//       }

//       user.profileImage = req.file.path;
//       await user.save();

//       return res.json({ success: true, message: "Profile image uploaded successfully", profileImage: req.file.path });
//     } catch (error) {
//       console.log(error);
//       return res.json({ success: false, message: "Something went wrong" });
//     }
//   });
// };

//logout controller function
export const logout = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" ? true : false,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });
    return res.json({ success: true, message: "Logout successful" });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Something went wrong" });
  }
};

//Sending verification otp to the user's email
export const sendVerifyOtp = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await userModel.findById(userId);

    if (user.isAccountVerified) {
      return res.json({ success: false, message: "Account already verified" });
    }

    const otp = String(Math.floor(Math.random() * 900000 + 100000));
    user.verifyOtp = otp;
    user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;
    await user.save();

    const mailOption = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Verify your account",
      text: `Your OTP for verifying your account is ${otp}`,
    };

    await transporter.sendMail(mailOption);

    res.json({
      success: true,
      message: "Verification OTP sent on email successfully",
    });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

//Verify email controller function
export const verifyEmail = async (req, res) => {
  const { userId, otp } = req.body;
  if (!userId || !otp) {
    return res.json({ success: false, message: "Missing Details" });
  }
  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    if (user.verifyOtp === "" || user.verifyOtp !== otp) {
      return res.json({ success: false, message: "Invalid OTP" });
    }

    if (user.verifyOtpExpireAt < Date.now()) {
      // console.log("OTP expired");
      return res.json({ success: false, message: "OTP expired" });
    }

    user.isAccountVerified = true;
    user.verifyOtp = "";
    user.verifyOtpExpireAt = 0;
    await user.save();
    return res.json({ success: true, message: "Email verified successfully" });
  } catch (error) {
    return res.json({ success: false, message: "User not found" });
  }
};

//Check if the user is authenticated or not
export const isAuthenticated = async (req, res) => {
  try {
    return res.json({ success: true, message: "Authenticated" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//Send passoword reset otp to the user's email
export const sendResetOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.json({ success: false, message: "Email is required" });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const otp = String(Math.floor(Math.random() * 900000 + 100000));
    user.resetOtp = otp;
    user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000;
    await user.save();

    const mailOption = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Reset your password",
      text: `Your OTP for resetting your password is ${otp}`,
    };

    await transporter.sendMail(mailOption);

    res.json({
      success: true,
      message: "Reset OTP sent on email successfully",
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

//Reset user password
export const resetPassword = async (req, res) => {
  const { email, otp, newPassword} = req.body;

  if (!email || !otp || !newPassword) {
    // if(!email){
    //   res.json({success: false, message: "Email is required"});
    // }
    // else if(!otp){
    //   res.json({success: false, message: "OTP is required"});
    // }
    // else if(!newPassword){
    //   res.json({success: false, message: "New password is required"});
    // }
    return res.json({
      success: false,
      message: "Email, OTP, new password are required",
    });
  }
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    if (user.resetOtp === "" || user.resetOtp !== otp) {
      return res.json({ success: false, message: "Invalid OTP" });
    }

    if (user.resetOtpExpireAt < Date.now()) {
      return res.json({ success: false, message: "OTP expired" });
    }
    if(!isStrongPassword(newPassword)){
      return res.json({ success: false, message: "Password must be 8 characters long and contains atleast 1 uppercase and 1 lowercase character and 1 number and 1 symbol" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetOtp = "";
    user.resetOtpExpireAt = 0;
    await user.save();

    return res.json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
