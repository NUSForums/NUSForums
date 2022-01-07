import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import 'firebase/firestore';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from './config/firebase';

import { UserContext, UserState } from './contexts/userContext';
import LandingPage from './pages/LandingPage';
import ModuleForum from './pages/ModuleForum';

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
    return (
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />}>
            <Route path="forum">
              <Route path=":module" element={<ModuleForum />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    );
  }

  return <div>Loading ....</div>;
};

export default MainRouter;
