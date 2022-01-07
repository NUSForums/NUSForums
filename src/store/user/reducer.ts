import { Action } from '../utils';
import type { User } from './type';

const initialState: User = {
  name: '',
  userId: '',
  isAdmin: false,
  anonymousName: '',
};

const userReducer = (state: User = initialState, action: Action<any>): User => {
  return state;
};

export default userReducer;
