import crypto from 'crypto';
import { ILogin, ISignup, LoginData, SignupData, IForgotPassword } from '../../types/auth';
import { ResultFunction, signJwt } from '../../helpers/utils';
import { ReturnStatus } from '../../types/generic';
import { comparePassword, hashPassword } from '../../helpers/hash';
import User from '../../models/user';
import { loginValidator, signupValidator } from '../../validators/auth';

class Auth {
	public async login(input: ILogin) {
		try {
			const { email, password } = input;
			// validation
			const user = await User.findOne({
				email: email,
			});
			if (user) {
				// console.log(user.password.length);

				const passwordMatch = comparePassword(user.password, password);
				if (!passwordMatch) {
					return ResultFunction(
						false,
						'invalid email or password',
						400,
						ReturnStatus.BAD_REQUEST,
						null
					);
				}
				const jwtToken = signJwt(user);
				if (!jwtToken) {
					return ResultFunction(
						false,
						'server error',
						500,
						ReturnStatus.NOT_OK,
						null
					);
				}
				const data: LoginData = {
					token: jwtToken,
					user: {
						email,
						username: user.username,
					},
				};
				return ResultFunction(
					true,
					'login successful',
					200,
					ReturnStatus.OK,
					data
				);
			} else {
				return ResultFunction(
					false,
					'user does not exist',
					400,
					ReturnStatus.BAD_REQUEST,
					null
				);
			}

			// check db

			// generate access token
			// maybe use jwt???
		} catch (error: any) {
			console.error(error);
			return ResultFunction(
				false,
				'something went wrong',
				422,
				ReturnStatus.NOT_OK,
				null
			);
		}
	}

	public async signup(input: ISignup) {
		try {
			const { username, email, password } = input;
			const data: SignupData = {
				user: {
					username,
					email,
					password,
				},
			};

			// abstract into function
			const user = await User.findOne({
				email: email,
			});
			if (user) {
				return ResultFunction(
					false,
					'user exists already',
					400,
					ReturnStatus.BAD_REQUEST,
					null
				);
			} else {
				try {
					// data.user.password = await hashPassword(data.user.password)
					// console.log(data.user.password);

					const newUser = (await User.create(data.user)).toObject();
					// console.log(newUser);

					const { password, ...other } = newUser;
					// console.log(other);
					// console.log(password);

					// data.user = other
					// console.log("user signup successful");
					// console.log(other);
					
					
					return ResultFunction(
						true,
						'signup successful',
						200,
						ReturnStatus.OK,
						other
					);
				} catch (error) {
					console.log(error);

					return ResultFunction(
						false,
						'sigunp failed',
						400,
						ReturnStatus.UNAUTHORIZED,
						null
					);
				}
			}
		} catch (error: any) {
			// console.log(error);

			return ResultFunction(
				false,
				'something went wrong',
				422,
				ReturnStatus.NOT_OK,
				null
			);
		}
	}

	public async forgotPassword(input: IForgotPassword) {
		const { email } = input

		// check if user exists
		const user = await User.findOne({
			email: email,
		});

		if (!user) {
			// user does not exist
			return ResultFunction(
				false,
				'user does not exist',
				442,
				ReturnStatus.BAD_REQUEST,
				null
			);
		}

		// send email with otp

		return ResultFunction(
			false,
			'check your email',
			200,
			ReturnStatus.OK,
			null
		);
	}

	public async confirmOTP(input: any) {
		// confirm otp
	}

	public async changePassword(input: any) {
		// once otp is confirmed
		// change password
	}
}

export default Auth;
