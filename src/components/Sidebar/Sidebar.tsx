import React, { useEffect } from 'react';
import SideBarRow from './SidebarRow';
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHooks';
import appLogo from '../../images/library-svgrepo-com.svg';

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const { pins } = useAppSelector((state) => state.pins);

  useEffect(() => {
    const val = localStorage.getItem('pins');
    const value: string[] = val ? JSON.parse(val) : [];
    dispatch({ type: 'FETCH_PINS', payload: value });
  }, []);

  return (
    <div className="w-64 h-screen bg-forum-sidebar">
      <img src={appLogo} className="ml-4 mt-6" width={100} height="auto" alt="appLogo" />
      <p className="px-5 pt-3 mt-1 mb-2 text-lg font-bold text-gray-50 font-poppins">Modules</p>
      <div className="w-full">
        {pins.map((code: string, index: number) => (
          <SideBarRow code={code} key={code} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
