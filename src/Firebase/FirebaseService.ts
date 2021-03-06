import * as dotenv from 'dotenv';
import firebase, { User } from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { Observable, Observer } from 'rxjs';
import {
  Project,
  ProjectCollection,
  ProjectUpdate,
} from '../shared/models/ProjectData';

dotenv.config();

export const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
};

export default class FirebaseService {
  private auth: firebase.auth.Auth;
  private database: firebase.database.Database;

  constructor() {
    firebase.initializeApp(firebaseConfig);
    this.auth = firebase.auth();
    this.database = firebase.database();
  }

  // *** Auth API ***
  public getCurrentUser(): Promise<firebase.User> {
    const currentUser = this.auth.currentUser;

    if (currentUser !== null) {
      return Promise.resolve(currentUser);
    }

    return Promise.reject();
  }

  public signInWithGoogle(): Promise<
    firebase.auth.UserCredential | firebase.User
  > {
    const currentUser = this.auth.currentUser;
    if (currentUser) {
      return Promise.resolve(currentUser);
    }
    return this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  public signOut = () => this.auth.signOut();

  public onAuthStateChanged$ = () =>
    new Observable((observer: Observer<User | null>) =>
      this.auth.onAuthStateChanged(
        user => observer.next(user),
        err => observer.error(err)
      )
    );

  // *** Database API ***
  public addNewProject = (project: Project) =>
    this.database.ref('/projects/' + project.projectId).set(project);

  public addNewUpdate = (update: ProjectUpdate) =>
    this.database
      .ref('/projects/' + update.projectId + '/updates/' + update.updateId)
      .set(update);

  public getProjectData$ = () =>
    Observable.create((observer: Observer<ProjectCollection>) =>
      this.database
        .ref('/projects')
        .on('value', (snapshot: firebase.database.DataSnapshot) =>
          observer.next(snapshot.val() as ProjectCollection)
        )
    );

  public getProjectDataOnce$ = () =>
    Observable.create((observer: Observer<ProjectCollection>) =>
      this.database
        .ref('/projects')
        .once('value', (snapshot: firebase.database.DataSnapshot) =>
          observer.next(snapshot.val() as ProjectCollection)
        )
    );
}
