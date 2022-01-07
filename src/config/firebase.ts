import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging';
import { getAuth } from 'firebase/auth';
import { getFunctions } from 'firebase/functions';
import { getFirestore } from 'firebase/firestore';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: 'nusforum-bbbca.appspot.com',
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_ID,
  appId: '1:961694321956:web:38b7eaf90dd12e728177b1',
};

const firebase = initializeApp(config);

export const auth = getAuth();
export const messaging = getMessaging();
export const functions = getFunctions();
export const db = getFirestore();
export default firebase;
