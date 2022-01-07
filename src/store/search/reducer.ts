import { ActionMap } from '../utils';
import type { Search } from './type';

const initialState = {
  value: '',
};

type SearchPayload = {
  ['SET_SEARCH']: string;
  ['CLEAR_SEARCH']: undefined;
};

type SearchActions = ActionMap<SearchPayload>[keyof ActionMap<SearchPayload>];

const searchReducer = (prevState: Search = initialState, action: SearchActions): Search => {
  switch (action.type) {
    case 'SET_SEARCH':
      return {
        value: action.payload,
      };
    case 'CLEAR_SEARCH':
      return {
        ...initialState,
      };
    default:
      return prevState;
  }
};

export default searchReducer;
