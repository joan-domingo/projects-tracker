import React from 'react';
import Firebase from './Firebase';

const FirebaseContext = React.createContext<Firebase | null>(null);

export default FirebaseContext;
