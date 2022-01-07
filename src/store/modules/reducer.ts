import { ModuleCondensed } from '../../types/modules';
import {  ActionMap } from '../utils';

interface ModulesMap {
  [key: string]: ModuleCondensed;
}

const initialState: ModulesMap = {};

type ModulePayload = {
  ['ADD_MODULES']: ModuleCondensed[];
  ['UPDATE_MODULE']: ModuleCondensed;
};

type ModuleActions = ActionMap<ModulePayload>[keyof ActionMap<ModulePayload>];

const modulesReducer = (prevState: ModulesMap = initialState, action: ModuleActions): ModulesMap => {
  switch (action.type) {
    case 'ADD_MODULES':
      return {
        ...prevState,
        ...action.payload?.reduce((acc, curr) => {
          acc[curr.moduleCode] = curr;
          return acc;
        }, {} as ModulesMap),
      };
    case 'UPDATE_MODULE':
      return { ...initialState, [action.payload.moduleCode]: action.payload };
    default:
      return prevState;
  }
};

export default modulesReducer;
