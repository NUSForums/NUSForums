import React, { useReducer, createContext, Dispatch, Reducer } from 'react';
import { ActionMap } from './types/actionMap';

export type UserState = {
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  pushTokenWeb: string | null;
};

export type UserContextState = {
  userId: string | null;
  userData: UserState;
  verifying: boolean;
};

type UserPayload = {
  ['UPDATE_USER_ID']: string;
  ['VERIFYING']: boolean;
  ['UPDATE_PROFILE']: Partial<UserState>;
  ['SIGN_OUT']: undefined;
};

type UserActions = ActionMap<UserPayload>[keyof ActionMap<UserPayload>];

const initialState: UserContextState = {
  userId: null,
  userData: {
    email: null,
    firstName: null,
    lastName: null,
    pushTokenWeb: null,
  },
  verifying: false,
};

const UserContext = createContext<{
  userState: UserContextState;
  userDispatch: Dispatch<UserActions>;
}>({ userState: initialState, userDispatch: () => null });

const reducer: Reducer<UserContextState, UserActions> = (prevState, action) => {
  switch (action.type) {
    case 'UPDATE_USER_ID':
      return { ...prevState, userId: action.payload };
    case 'VERIFYING':
      return { ...prevState, verifying: action.payload };
    case 'UPDATE_PROFILE':
      return {
        ...prevState,
        userData: {
          ...prevState.userData,
          ...action.payload,
        },
      };
    case 'SIGN_OUT':
      return { ...initialState };
    default:
      return prevState;
  }
};

const UserProvider: React.FC = ({ children }) => {
  const [userState, userDispatch] = useReducer(reducer, initialState);
  return <UserContext.Provider value={{ userState, userDispatch }}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };
