import { applyMiddleware, createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import modulesReducer from './modules/reducer';
import userReducer from './user/reducer';
import metaReducer from './metadata/reducer';
import pinsReducer from './pins/reducer';
import searchReducer from './search/reducer';

const RootReducer = combineReducers({
  metadata: metaReducer,
  modules: modulesReducer,
  user: userReducer,
  pins: pinsReducer,
  search: searchReducer
});

const store = createStore(RootReducer, composeWithDevTools(applyMiddleware(thunk)));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
