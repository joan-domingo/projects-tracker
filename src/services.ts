import FirebaseService from './Firebase/FirebaseService';
import ProjectDataService from './projects/ProjectDataService';

export const firebaseService = new FirebaseService();

export const projectDataService = new ProjectDataService(firebaseService);
