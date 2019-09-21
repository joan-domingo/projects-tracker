import React, { FC } from 'react';
import FirebaseContext from './FirebaseContext';

const ExampleFirebaseComponent: FC = () => (
  <FirebaseContext.Consumer>
    {firebase => {
      return <div>I've access to Firebase and render something.</div>;
    }}
  </FirebaseContext.Consumer>
);
export default ExampleFirebaseComponent;
