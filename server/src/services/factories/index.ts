import Auth from '../classes/auth';
import Files from '../classes/file';

export const authFactory = () => {
	// define parameters for initialization here

	return new Auth();
};

export const fileFactory = () => {
	return new Files();
};


