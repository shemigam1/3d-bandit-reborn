import { NextFunction, Request, Response } from 'express';
import { ISignup, ILogin, IForgotPassword } from '../types/auth';
import { authFactory } from '../services/factories';

export const signupController = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const input: ISignup = {
		username: req.body.username,
		email: req.body.email,
		password: req.body.password,
	};
	const response = await authFactory().signup(input);
	return res.status(response.code).json(response);
};
export const loginController = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	// console.log('entered controller');
	const input: ILogin = {
		email: req.body.email,
		password: req.body.password,
	};
	const response = await authFactory().login(input);
	return res.status(response.code).json(response);
};


export const forgotPasswordController = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	// console.log('entered controller');
	const input: IForgotPassword = {
		email: req.body.email,
	};
	const response = await authFactory().forgotPassword(input);
	return res.status(response.code).json(response);
};
