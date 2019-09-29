import * as dotenv from 'dotenv';
import firebase, { User } from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { Observable, Observer } from 'rxjs';
import { ProjectData } from '../shared/models/ProjectData';

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

  public signInWithGoogle = () => {
    const currentUser = this.auth.currentUser;
    if (currentUser) {
      return Promise.resolve({ user: currentUser });
    }
    return this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  };

  public signOut = () => this.auth.signOut();

  public onAuthStateChanged$ = () =>
    Observable.create((observer: Observer<User | null>) =>
      this.auth.onAuthStateChanged(
        user => observer.next(user),
        err => observer.error(err)
      )
    );

  // *** Database API ***
  public addNewProject(projectId: string, projectData: ProjectData) {
    return this.database.ref('/projects/' + projectId).set(projectData);
  }
}
