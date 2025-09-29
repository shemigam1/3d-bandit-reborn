export interface ILogin {
	email: string;
	password: string;
}

export type LoginData = {
	user: {
		email: string;
		username: string;
	};
	token: string;
};

export interface ISignup {
	username: string,
	email: string;
	password: string;
}

export type SignupData = {
	user: {
		username: string,
		email: string;
		password: string;
	};
	// name: string;
};

export interface IForgotPassword {
	email: string
}
