import { from, Observable } from 'rxjs';
import FirebaseService from '../Firebase/FirebaseService';

export default class ProjectDataService {
  private firebaseService: FirebaseService;

  constructor(firebaseService: FirebaseService) {
    this.firebaseService = firebaseService;
  }

  public addNewProject$(): Observable<any> {
    const projectId = 'test1';
    const projectData = {
      id: projectId,
      name: 'Test Project',
    };
    return from(this.firebaseService.addNewProject(projectId, projectData));
  }
}
