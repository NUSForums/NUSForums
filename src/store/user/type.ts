type User = {
  name: string;
  userId: string;
  image?: string; // TODO: check on its type again. Temporary put as optional
  isAdmin: boolean;
  anonymousName: string;
};

export type { User };
