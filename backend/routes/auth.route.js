import { Router } from 'express';
import { signup, login } from '../controllers/auth.controller.js';
import { validate } from '../middlewares/joi.middleware.js';
import { signupSchema, loginSchema } from '../validations/auth.validation.js';

const authRouter = Router();

authRouter.post('/signup', validate(signupSchema), signup);
authRouter.post('/login', validate(loginSchema), login);

export default authRouter;