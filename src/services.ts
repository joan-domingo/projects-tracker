import AuthService from './auth/AuthService';
import FirebaseService from './Firebase/FirebaseService';

export const firebaseService = new FirebaseService();

export const authService = new AuthService(firebaseService);
