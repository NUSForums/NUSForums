import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';

const SubscribeButton = ({ moduleCode }) => {
  const dispatch = useAppDispatch();
  const { pins } = useAppSelector((state) => state.pins);

  const onClick = () => {
    localStorage.setItem('pins', JSON.stringify([...pins, moduleCode]));
    dispatch({ type: 'ADD_PINS', payload: `${moduleCode}` });
  };

  if (pins.includes(moduleCode)) {
    return (
      <div className="w-full py-3 text-lg font-bold text-center bg-white rounded-lg text-forum-subText">Subscribed</div>
    );
  }

  return (
    <button
      className="w-full py-3 text-lg font-bold text-center bg-white rounded-lg shadow-post text-forum-title"
      onClick={onClick}
    >
      Subscribe
    </button>
  );
};

export default SubscribeButton;
