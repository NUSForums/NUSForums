import React from 'react';

import Sidebar from '../components/Sidebar/Sidebar';
import Header from '../components/Header/Header';
import ModuleInfo from '../components/ModuleInfo/ModuleInfo';
import { Outlet } from 'react-router-dom';

const Forum = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div>
        <Header />
        <Outlet />
      </div>
      <ModuleInfo moduleCode={'CS3230'} />
    </div>
  );
};

export default Forum;
