import express from 'express';
import {isAuthenticated, login, logout, register, resetPassword, sendResetOtp, sendVerifyOtp, uploadProfileImage, verifyEmail} from '../controllers/authController.js';
import userAuth from '../middleware/userAuth.js';


const authRouter = express.Router();
//Defining the api endpoints here
authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.post('/send-verify-otp', userAuth, sendVerifyOtp);
authRouter.post('/verify-email', userAuth, verifyEmail); 
authRouter.post('/upload-profile-image', userAuth, uploadProfileImage);
authRouter.get('/is-authenticated', userAuth, isAuthenticated);

authRouter.post('/send-reset-otp', sendResetOtp);
authRouter.post('/reset-password',resetPassword);



export default authRouter;