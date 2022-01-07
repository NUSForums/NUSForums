import React, { useState, useEffect, useContext } from 'react';
import { auth, db } from './config/firebase';
import 'firebase/firestore';
import { UserContext, UserState } from './contexts/userContext';
import HelloPage from './pages/hello';
import { doc, getDoc } from 'firebase/firestore';

const MainRouter = () => {
  const [initializationComplete, setInitComplete] = useState(false);
  const { userState, userDispatch } = useContext(UserContext);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!!user) {
        const uid = user.uid;
        getDoc(doc(db, 'users', uid)).then((res) => {
          if (res.data() && res.data()?.firstName) {
            userDispatch({ type: 'UPDATE_PROFILE', payload: res.data() as Partial<UserState> });
            userDispatch({ type: 'VERIFYING', payload: false });
          }
          userDispatch({ type: 'UPDATE_USER_ID', payload: uid });
          setInitComplete(true);
        });
      } else {
        userDispatch({ type: 'SIGN_OUT' });
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
