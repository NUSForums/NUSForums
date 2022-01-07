type Votes = {
  [moduleCode: string]: {
    [postId: string]: '+' | '-';
  };
};

export type { Votes };
