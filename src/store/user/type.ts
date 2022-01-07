type User = {
  name: string;
  userId: string;
  image?: string; // TODO: check on its type again. Temporary put as optional
  isAdmin: boolean;
  anonymousName: string;
  votes: Votes;
};

type Votes = {
  [moduleCode: string]: {
    [postId: string]: '+' | '-';
  };
};

export type { User };
