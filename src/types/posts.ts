type Post = {
  id: string;
  title: string;
  body: string;
  tags: string[];
  moduleCode: string;
  userId: string;
  userName: string;
  isAnonymous: boolean;
  upvotes: number;
  downvotes: number;
  creationDate: Date;
  comments: Comment[];
};

type Comment = {
  id: string;
  userId: string;
  userName: string;
  comment: string;
  upvotes: number;
  downvotes: number;
  creationDate: Date;
};

export type { Post, Comment };
