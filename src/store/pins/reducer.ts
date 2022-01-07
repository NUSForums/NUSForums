import { Action, isType } from '../utils';

interface InitialState {
  pins: string[];
}

const initialState = {
  pins: [],
};

const pinsReducer = (state: InitialState = initialState, action: Action<any>): InitialState => {
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
