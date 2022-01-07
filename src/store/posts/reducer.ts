import { Action, isType } from '../utils';
import type { Post } from './type';

interface InitialState {
  posts: Post[];
}

const initialState = {
  posts: [],
};

const postsReducer = (state: InitialState = initialState, action: Action<any>): InitialState => {
  /*
    TODO: remove it once understood. Sample Usage
     if (isType(action, FETCH_POSTS.REQUEST)) {
    return {
      ...state,
      // can add loading nexttime
    };

    if (isType(action, FETCH_POSTS.SUCCESS)) {
    return {
      ...state,
      posts: [...state.posts, ...(action.payload!.data?.table || [])],
    };
  }

  if (isType(action, FETCH_POSTS.FAILURE)) {
    return {
      ...state,
      // can add loading next time and some failue thing?
    };
  }
  }
  */

  return state;
};

export default postsReducer;
