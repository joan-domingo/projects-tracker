import React, { FC } from 'react';

import FirebaseContext from '../Firebase/FirebaseContext';

const SignInPage: FC = () => {
  return (
    <FirebaseContext.Consumer>
      {firebase => {
        return (
          <div>
            <button onClick={firebase!.signInWithGoogle}>SignIn</button>
            <button onClick={firebase!.signOut}>SignOut</button>
          </div>
        );
      }}
    </FirebaseContext.Consumer>
  );
};

export default SignInPage;
