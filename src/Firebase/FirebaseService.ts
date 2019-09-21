import * as dotenv from 'dotenv';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

dotenv.config();

export const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
};

export default class FirebaseService {
  private auth: firebase.auth.Auth;

  constructor() {
    firebase.initializeApp(firebaseConfig);
    this.auth = firebase.auth();
  }

  // *** Auth API ***
  public signInWithGoogle = () =>
    this.auth!.signInWithPopup(new firebase.auth.GoogleAuthProvider());

  public signOut = () => this.auth!.signOut();
}
