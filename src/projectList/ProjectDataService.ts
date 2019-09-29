import { from, Observable } from 'rxjs';
import FirebaseService from '../Firebase/FirebaseService';
import { ProjectCollection } from '../shared/models/ProjectData';

export default class ProjectDataService {
  private firebaseService: FirebaseService;

  constructor(firebaseService: FirebaseService) {
    this.firebaseService = firebaseService;
  }

  public addNewProject$(): Observable<any> {
    const projectId = 'test3';
    const projectData = {
      id: projectId,
      name: 'Test Project 3',
      description: 'Test project description bla balba asdf asd...',
    };
    return from(this.firebaseService.addNewProject(projectId, projectData));
  }

  public readProjectData$(): Observable<ProjectCollection> {
    return this.firebaseService.getProjectData$();
  }
}
