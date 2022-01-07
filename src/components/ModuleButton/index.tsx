import React, { useState } from 'react';
import { useAppDispatch } from '../../hooks/reduxHooks';

/*
 TESTING PURPOSES
*/
const ModuleButton = () => {
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

  const [state, setState] = useState(0);
  const dispatch = useAppDispatch();

  const onClick = () => {
    dispatch({ type: 'ADD_PINS', payload: `${modulesPin[state]}` });
    setState((state) => state + 1);
    console.log('called');
  };

  return <div onClick={onClick}>test test test</div>;
};

export default ModuleButton;
