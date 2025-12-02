import { Router } from 'express';

import { signup, login, logout, sendResetPasswordOTP, resetPassword } from '../controllers/auth.controller.js';
import * as authValidation from '../validations/auth.validation.js';

import { validate } from '../middlewares/joi.middleware.js';
import { protectRoute } from '../middlewares/auth.middleware.js';

const authRouter = Router();

authRouter.post('/signup', validate(authValidation.signupSchema), signup);
authRouter.post('/login', validate(authValidation.loginSchema), login);
authRouter.post('/logout', logout);
authRouter.post('/send-reset-password-otp', validate(authValidation.otpSchema), sendResetPasswordOTP);
authRouter.post('/reset-password', validate(authValidation.resetPasswordSchema), resetPassword);

export default authRouter;