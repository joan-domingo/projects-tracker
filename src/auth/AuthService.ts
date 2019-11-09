import { User } from 'firebase';
import { from, Observable } from 'rxjs';
import FirebaseService from '../Firebase/FirebaseService';

export default class AuthService {
  private firebaseService: FirebaseService;

  constructor(firebaseService: FirebaseService) {
    this.firebaseService = firebaseService;
  }

  public getUser$(): Observable<User> {
    return from(this.firebaseService.getCurrentUser());
  }

  public signUserIn$(): Observable<
    firebase.auth.UserCredential | firebase.User
  > {
    return from(this.firebaseService.signInWithGoogle());
  }

  public signUserOut$(): Observable<void> {
    return from(this.firebaseService.signOut());
  }

  public onAuthStateChanged$(): Observable<User | null> {
    return this.firebaseService.onAuthStateChanged$();
  }
}
