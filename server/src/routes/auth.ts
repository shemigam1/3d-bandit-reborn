import { Router } from 'express';

import { forgotPasswordController, loginController, signupController } from '../controllers/auth';
import joiMiddleware from '../middlewares/joiMiddleware';
import { loginValidator, signupValidator, forgotPasswordValidator } from '../validators/auth';

const authRouter = Router();

authRouter.post('/login', joiMiddleware(loginValidator), loginController);
authRouter.post('/signup', joiMiddleware(signupValidator), signupController);
authRouter.post('/forgotPassword', joiMiddleware(forgotPasswordValidator), forgotPasswordController);

export default authRouter;
