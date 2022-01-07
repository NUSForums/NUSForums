import app from 'firebase/app';
import 'firebase/messaging';
import 'firebase/auth';
import 'firebase/functions';
import 'firebase/firestore';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: 'nusforum-bbbca.appspot.com',
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_ID,
  appId: '1:961694321956:web:38b7eaf90dd12e728177b1',
};
app.initializeApp(config);

export default app;
