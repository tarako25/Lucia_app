export interface Item {
  id: number;
  comment_count: number;
  content: string;
  createdAt: Date;
  username: string;
}

export interface PostListProps {
  userId: string;
  username: string;
}

export interface Example {
  userId: string;
  username: string;
}
