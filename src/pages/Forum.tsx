import React from 'react';

import Sidebar from '../components/Sidebar/Sidebar';
import Header from '../components/Header/Header';
import { Outlet } from 'react-router-dom';

const Forum = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div>
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default Forum;
