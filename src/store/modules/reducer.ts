import { Action, isType } from '../utils';
import type { Module } from './type';

// TODO: Once all the api modules are scraped, make a map function that extract the module code out in an array as const. Then using that
// we mapped that as a key with it the keys being optional
interface InitialState {
  [key: string]: Module;
}

const initialState = {};

const modulesReducer = (state: InitialState = initialState, action: Action<any>): InitialState => {
  return state;
};

export default modulesReducer;
