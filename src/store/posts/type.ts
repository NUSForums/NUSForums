type Post = {
  id: string;
  title: string;
  body: string;
  tags: string[];
  moduleCode: string;
  userId: string;
  isAnonymous: boolean;
  upvotes: number;
  downvotes: number;
  creationDate: Date;
  comments: Comment[];
};

type Comment = {
  userId: string;
  comment: string;
  upvotes: number;
  downvotes: number;
};

export type { Post, Comment };
