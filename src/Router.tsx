import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import 'firebase/firestore';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from './config/firebase';

import LandingPage from './pages/LandingPage';
import Forum from './pages/Forum';
import ModuleForum from './components/ModuleForum/ModuleForum';

const MainRouter = () => {
  const [initializationComplete, setInitComplete] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      // TODO: when user log in later!
      // if (!!user) {
      //   const uid = user.uid;
      //   getDoc(doc(db, 'users', uid)).then((res) => {
      //     if (res.data() && res.data()?.firstName) {
      //       userDispatch({ type: 'UPDATE_PROFILE', payload: res.data() as Partial<UserState> });
      //       userDispatch({ type: 'VERIFYING', payload: false });
      //     }
      //     userDispatch({ type: 'UPDATE_USER_ID', payload: uid });
      //     setInitComplete(true);
      //   });
      // } else {
      //   userDispatch({ type: 'SIGN_OUT' });
      //   setInitComplete(true);
      // }
    });
  }, []);

  // TODO: change it later
  if (true) {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="forum" element={<Forum />}>
            <Route path=":module" element={<ModuleForum />} />
          </Route>
        </Routes>
      </Router>
    );
  }

  return <div>Loading ....</div>;
};

export default MainRouter;
