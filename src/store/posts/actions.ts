// import { apiFetchPosts } from '../../hooks';
// import { createRequestTypes } from '../utils';
// import type { Post } from './type';

// export const FETCH_POSTS = createRequestTypes<void, { data: Post[] }, void>('FETCH_POSTs');

// // TODO: when we know how the api is structured
// export const fetchPosts = () => {
//   return async (dispatch: any) => {
//     dispatch(FETCH_POSTS.REQUEST);

//     // TODO: depends on the params
//     const res = await apiFetchPosts();
//     const { data, err } = res;

//     if (err) {
//       dispatch(FETCH_POSTS.FAILURE());
//     } else {
//       dispatch(FETCH_POSTS.SUCCESS({ data }));
//     }
//   };
// };
export {}