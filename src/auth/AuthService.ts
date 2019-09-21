import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import FirebaseService from '../Firebase/FirebaseService';

interface UserCredentials {
  email: string;
}

export default class AuthService {
  private firebaseService: FirebaseService;

  constructor(firebaseService: FirebaseService) {
    this.firebaseService = firebaseService;
  }

  public getUser$(): Observable<UserCredentials> {
    return from(this.firebaseService.signInWithGoogle()).pipe(
      map(userCredential => {
        const email = userCredential.user!.email!;
        return { email };
      })
    );
  }
}
