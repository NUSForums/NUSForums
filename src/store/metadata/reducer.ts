import { ActionMap } from '../utils';
import type { MetaData } from './type';

const initialState: MetaData = {
  acadYear: '2021-2022',
  semester: 2,
  tags: [],
  counter: 0,
};

type MetaPayload = {
  ['UPDATE_METADATA']: Partial<MetaData>;
  ['REMOVE_METADATA']: undefined;
};

type MetaActions = ActionMap<MetaPayload>[keyof ActionMap<MetaPayload>];

const metaReducer = (prevState: MetaData = initialState, action: MetaActions): MetaData => {
  switch (action.type) {
    case 'UPDATE_METADATA':
      return { ...prevState, ...action.payload };
    case 'REMOVE_METADATA':
      return { ...initialState };
    default:
      return prevState;
  }
};

export default metaReducer;
