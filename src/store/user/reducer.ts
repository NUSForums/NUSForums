import { ActionMap } from '../utils';
import type { User } from './type';
import { uniqueNamesGenerator, animals } from 'unique-names-generator';

const getAnonymousDetails = () => {
  const name =
    localStorage.getItem('name') ||
    uniqueNamesGenerator({
      dictionaries: [['Anonymous'], animals],
      length: 2,
      separator: ' ',
      style: 'capital',
    });
  localStorage.setItem('name', name);
  return {
    image: `https://avatars.dicebear.com/api/gridy/${name?.replaceAll(' ', '')}.svg`,
    name: name,
  };
};

const getInitialState = (): User => {
  const anon = getAnonymousDetails();

  return {
    name: '',
    userId: '',
    image: anon.image,
    isAdmin: false,
    anonymousName: anon.name,
    modulesPinned: [],
  };
};

type UserPayload = {
  ['UPDATE_PROFILE']: Partial<User>;
  ['CHANGE_ANONYMOUS_NAME']: string;
  ['UPDATE_PINNED']: string[];
  ['SIGN_OUT']: undefined;
};

type UserActions = ActionMap<UserPayload>[keyof ActionMap<UserPayload>];

const userReducer = (prevState: User = getInitialState(), action: UserActions): User => {
  switch (action.type) {
    case 'UPDATE_PROFILE':
      return {
        ...prevState,
        ...action.payload,
      };
    case 'CHANGE_ANONYMOUS_NAME':
      return {
        ...prevState,
        anonymousName: action.payload,
      };
    case 'UPDATE_PINNED':
      return {
        ...prevState,
        modulesPinned: action.payload,
      };
    case 'SIGN_OUT':
      return {
        ...getInitialState(),
      };
    default:
      return prevState;
  }
};

export default userReducer;
