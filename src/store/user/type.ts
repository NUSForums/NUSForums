type User = {
  name: string;
  userId: string;
  image?: string; // TODO: check on its type again. Temporary put as optional
  modulesPinned?: string[]; // TODO: check if we are using localforage for this. Temporary put as optional
  isAdmin: boolean;
  anonymous_name: string;
};

export type { User };
