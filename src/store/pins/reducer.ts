import { Action, isType } from '../utils';

interface InitialState {
  pins: string[];
}

const getInitialState = (): InitialState => {
  const pins = JSON.parse(localStorage.getItem('pins') || '[]');

  return { pins };
};

const pinsReducer = (state: InitialState = getInitialState(), action: Action<any>): InitialState => {
  switch (action.type) {
    case 'FETCH_PINS':
      return {
        pins: action.payload || [],
      };
    case 'ADD_PINS':
      return {
        pins: [...state.pins, action.payload!],
      };
    case 'REMOVE_PINS':
      const newArr = [...state.pins].filter((item) => item !== action.payload!);
      return {
        pins: newArr,
      };
    default:
      return state;
  }
};

export default pinsReducer;
