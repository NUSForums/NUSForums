import React, { useState } from 'react';
import { useAppDispatch } from '../../hooks/reduxHooks';

/*
 TESTING PURPOSES
*/
const SubscribeButton = ({ moduleCode }) => {
  const modulesPin = [
    'CS3230',
    'CS2102',
    'MA1521',
    'GES100H',
    'CS1231S',
    'MA1101R',
    'CS3203',
    'CS3240',
    'CS2107',
    'CS2106',
    'CS2100',
  ];

  const dispatch = useAppDispatch();

  const onClick = () => {
    dispatch({ type: 'ADD_PINS', payload: `${moduleCode}` });
    console.log('called');
  };

  return (
    <button className="py-3 text-center font-bold text-forum-title bg-white rounded-lg text-lg" onClick={onClick}>
      Subscribe
    </button>
  );
};

export default SubscribeButton;
