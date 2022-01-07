import { ActionMap } from '../utils';
import type { Search } from './type';

const initialState = {
  value: '',
  shouldClear: false,
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
        shouldClear: false,
      };
    case 'CLEAR_SEARCH':
      return {
        ...prevState,
        shouldClear: true,
      };
    default:
      return prevState;
  }
};

export default searchReducer;
