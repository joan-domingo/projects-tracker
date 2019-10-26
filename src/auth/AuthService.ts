import { User } from 'firebase';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import FirebaseService from '../Firebase/FirebaseService';

export interface UserCredentials {
  email: string;
}

export default class AuthService {
  private firebaseService: FirebaseService;

  constructor(firebaseService: FirebaseService) {
    this.firebaseService = firebaseService;
  }

  public getUser$(): Observable<User> {
    return from(this.firebaseService.getCurrentUser());
  }

  public signUserIn$(): Observable<UserCredentials> {
    return from(this.firebaseService.signInWithGoogle()).pipe(
      map(userCredential => {
        const email = userCredential.user!.email!;
        return { email };
      })
    );
  }

  public signUserOut$(): Observable<void> {
    return from(this.firebaseService.signOut());
  }

  public onAuthStateChanged$(): Observable<User | null> {
    return this.firebaseService.onAuthStateChanged$();
  }
}
