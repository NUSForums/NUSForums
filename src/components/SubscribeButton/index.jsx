import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';

const SubscribeButton = ({ moduleCode }) => {
  const dispatch = useAppDispatch();
  const pins = useAppSelector((state) => state.pins.pins);

  const onClick = () => {
    dispatch({ type: 'ADD_PINS', payload: `${moduleCode}` });
  };

  if (pins.includes(moduleCode)) {
    return (
      <div className="py-3 w-full text-center font-bold text-forum-subText bg-white rounded-lg text-lg">Subscribed</div>
    );
  }

  return (
    <button
      className="py-3 w-full text-center font-bold text-forum-title bg-white rounded-lg text-lg"
      onClick={onClick}
    >
      Subscribe
    </button>
  );
};

export default SubscribeButton;
