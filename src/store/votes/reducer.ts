import { ActionMap } from '../utils';
import { Votes } from './type';

const getInitialState = (): Votes => {
  const jsonData = localStorage.getItem('votes') || '{}';
  return JSON.parse(jsonData);
};

type VotePayload = {
  ['TOGGLE_UPVOTE']: {
    module: string;
    post: string;
  };
  ['TOGGLE_DOWNVOTE']: {
    module: string;
    post: string;
  };
};

type VoteActions = ActionMap<VotePayload>[keyof ActionMap<VotePayload>];

const voteReducer = (prevState: Votes = getInitialState(), action: VoteActions): Votes => {
  console.log(prevState, action);
  switch (action.type) {
    case 'TOGGLE_UPVOTE':
      let { module, post } = action.payload;

      if (prevState[module] && prevState[module][post] === '+') {
        const { [post]: discard, ...rest } = prevState[module];
        return {
          ...prevState,
          [module]: {
            ...rest,
          },
        };
      } else {
        console.log(prevState[module][post]);
        return {
          ...prevState,
          [module]: {
            ...(prevState[module] || {}),
            [post]: '+',
          },
        };
      }
    case 'TOGGLE_DOWNVOTE':
      let { module: moduleD, post: postD } = action.payload;

      if (prevState[moduleD] && prevState[moduleD][postD] === '-') {
        const { [postD]: discard, ...rest } = prevState[moduleD];
        return {
          ...prevState,
          [moduleD]: {
            ...rest,
          },
        };
      } else {
        return {
          ...prevState,
          [moduleD]: {
            ...(prevState[moduleD] || {}),
            [postD]: '-',
          },
        };
      }
    default:
      return prevState;
  }
};

const voteReducerWithUpdate = (prevState: Votes | undefined, action: VoteActions): Votes => {
  const result = voteReducer(prevState, action);
  localStorage.setItem('votes', JSON.stringify(result));
  return result;
};

export default voteReducerWithUpdate;
