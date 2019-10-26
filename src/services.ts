import AuthService from './auth/AuthService';
import FirebaseService from './Firebase/FirebaseService';
import ProjectDataService from './projectList/ProjectDataService';

export const firebaseService = new FirebaseService();

export const authService = new AuthService(firebaseService);
export const projectDataService = new ProjectDataService(firebaseService);
