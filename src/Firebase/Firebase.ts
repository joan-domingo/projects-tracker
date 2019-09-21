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

class Firebase {
  private auth: firebase.auth.Auth | undefined = undefined;

  constructor() {
    firebase.initializeApp(firebaseConfig);

    this.auth = firebase.auth();
  }

  // *** Auth API ***
  public signInWithGoogle = () =>
    this.auth!.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(result => {
        // tslint:disable-next-line: no-console
        console.log(result);
      })
      .catch(error => {
        // tslint:disable-next-line: no-console
        console.log(error.message);
      });

  public signOut = () =>
    this.auth!.signOut()
      // tslint:disable-next-line: no-console
      .then(result => console.log(result))
      .catch();
}

export default Firebase;
