import { from, Observable } from 'rxjs';
import FirebaseService from '../Firebase/FirebaseService';
import { Project, ProjectCollection } from '../shared/models/ProjectData';

export default class ProjectDataService {
  private firebaseService: FirebaseService;

  constructor(firebaseService: FirebaseService) {
    this.firebaseService = firebaseService;
  }

  public addNewProject$(project: Project): Observable<any> {
    return from(this.firebaseService.addNewProject(project));
  }

  public readProjectData$(): Observable<ProjectCollection> {
    return this.firebaseService.getProjectData$();
  }
}
