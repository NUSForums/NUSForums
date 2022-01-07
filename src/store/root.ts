import { applyMiddleware, createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

// import postsReducer from './posts/reducer';
import modulesReducer from './modules/reducer';
import userReducer from './user/reducer';

const RootReducer = combineReducers({ modulesReducer, userReducer });

const Store = createStore(RootReducer, composeWithDevTools(applyMiddleware(thunk)));

export type RootState = ReturnType<typeof RootReducer>;

export default Store;
