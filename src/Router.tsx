import React, { useState, useEffect, useContext } from 'react';
import firebase from './config/firebase.js';
import 'firebase/firestore';
import { UserContext } from './contexts/userContext.js';
import HelloPage from './pages/hello.js';

const MainRouter = () => {
  const [initializationComplete, setInitComplete] = useState(false);
  const { userState, userDispatch } = useContext(UserContext);
  const db = firebase.firestore();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!!user) {
        const uid = firebase.auth().currentUser.uid;
        db.collection('users')
          .doc(uid)
          .get()
          .then((res) => {
            if (res.data() && res.data().firstName) {
              userDispatch({ type: 'updateProfile', payload: res.data() }, { type: 'verifying', payload: false });
            }
            userDispatch({ type: 'updateUserId', payload: uid });
            setInitComplete(true);
          });
      } else {
        userDispatch({ type: 'signOut' });
        setInitComplete(true);
      }
    });
  }, []);

  if (initializationComplete) {
    return <div>Loading...</div>;
  }

  return <HelloPage />;
};

export default MainRouter;
