import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import 'firebase/firestore';
import { auth, db } from './config/firebase';

import LandingPage from './pages/LandingPage';
import Forum from './pages/Forum';
import ModuleForum from './components/ModuleForum';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { MetaData } from './store/metadata/type';
import { useAppDispatch, useAppSelector } from './hooks/reduxHooks';
import axios from 'axios';
import { NUSMOD_API } from './config/constants';
import { ModuleCondensed } from './types/modules';
import { toast } from 'react-toastify';
import { User } from './store/user/type';

const MainRouter = () => {
  const [initComplete, setInitComplete] = useState(false);
  const dispatch = useAppDispatch();
  const acadYear = useAppSelector((state) => state.metadata.acadYear);

  // fetch metadata
  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'metadata', 'current'), (doc) => {
      dispatch({ type: 'UPDATE_METADATA', payload: doc.data() as MetaData });
    });

    return unsubscribe;
  }, [dispatch]);

  // fetch metadata
  useEffect(() => {
    if (acadYear) {
      axios
        .get(`${NUSMOD_API}/${acadYear}/moduleList.json`, {
          params: {
            acadYear: acadYear,
          },
        })
        .then((res) => res.data as ModuleCondensed[])
        .then((mods) => dispatch({ type: 'ADD_MODULES', payload: mods }))
        .catch((err) => toast.error(err));
    }
  }, [acadYear, dispatch]);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      // TODO: when user log in later!
      if (!!user) {
        const uid = user.uid;
        getDoc(doc(db, 'users', uid)).then((res) => {
          if (res.data()) {
            dispatch({ type: 'UPDATE_PROFILE', payload: res.data() as User });
          }
          setInitComplete(true);
        });
      } else {
        dispatch({ type: 'SIGN_OUT' });
        setInitComplete(true);
      }
    });
  }, []);

  // TODO: change it later
  if (initComplete) {
    return (
      <Router>
        <Routes>
          <Route path="forum" element={<Forum />}>
            <Route path=":module" element={<ModuleForum />} />
          </Route>
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </Router>
    );
  }

  return <div>Loading ....</div>;
};

export default MainRouter;
