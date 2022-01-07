import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';

const SubscribeButton = ({ moduleCode }) => {
  const dispatch = useAppDispatch();
  const { pins } = useAppSelector((state) => state.pins);

  const onSubscribe = () => {
    localStorage.setItem('pins', JSON.stringify([...pins, moduleCode]));
    dispatch({ type: 'ADD_PINS', payload: `${moduleCode}` });
  };

  const onUnsubscribe = () => {
    localStorage.setItem('pins', JSON.stringify(pins.filter((x) => x !== moduleCode)));
    dispatch({ type: 'REMOVE_PINS', payload: `${moduleCode}` });
  };

  if (pins.includes(moduleCode)) {
    return (
      <button
        className="w-full py-3 text-lg font-bold text-center bg-white rounded-lg shadow-post text-forum-subText"
        onClick={onUnsubscribe}
      >
        Unsubscribe
      </button>
    );
  }

  return (
    <button
      className="w-full py-3 text-lg font-bold text-center bg-white rounded-lg shadow-post text-forum-title"
      onClick={onSubscribe}
    >
      Subscribe
    </button>
  );
};

export default SubscribeButton;
