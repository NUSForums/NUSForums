type Module = {
  title: string;
  description: string;
  workload: Workload[];
  postId: string[]; // This is a mapping to posts. This is to allow quick retrival of posts
  // TODO: what is ... all scraped data?
};

type Workload = {
  [key: string]: number;
};

export type { Module, Workload };
