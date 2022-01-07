import React, { useEffect } from 'react';
import SideBarRow from './SidebarRow';
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHooks';

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const { pins } = useAppSelector((state) => state.pins);

  useEffect(() => {
    const val = localStorage.getItem('pins');
    const value = (val ?? []) as string[];
    dispatch({ type: 'FETCH_PINS', payload: value });
  }, []);

  return (
    <div className="flex flex-col w-64 h-screen bg-forum-sidebar">
      <div className="grid py-5 m-auto my-3 place-items-center">hello world</div>
      <div className="w-full" style={{ background: '#2a3542', height: '1.5px' }} />
      <p className="px-5 pt-5 my-2 text-xs font-bold text-forum-sidebarTitle font-poppins">Modules</p>
      <div className="w-full">
        {pins.map((code: string, index: number) => (
          <SideBarRow code={code} key={index} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
