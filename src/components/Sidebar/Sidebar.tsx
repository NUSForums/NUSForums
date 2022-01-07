import React, { useEffect } from 'react';
import SideBarRow from './SidebarRow';
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHooks';

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
      <div className="grid py-4 m-auto my-3 place-items-center">hello world</div>
      <p className="px-5 pt-5 my-2 text-lg font-bold text-gray-50 font-poppins">Modules</p>
      <div className="w-full">
        {pins.map((code: string, index: number) => (
          <SideBarRow code={code} key={code} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
