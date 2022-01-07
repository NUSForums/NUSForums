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
    <div className="w-200 bg-forum-sidebar h-screen">
      <div className="my-3 m-auto grid place-items-center py-5">hello world</div>
      <div className="w-full" style={{ background: '#2a3542', height: '1.5px' }} />
      <p className="text-forum-sidebarTitle my-2 font-poppins font-bold px-5 text-xs pt-5">Modules</p>
      <div>
        {pins.map((code: string, index: number) => (
          <SideBarRow code={code} key={code} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
