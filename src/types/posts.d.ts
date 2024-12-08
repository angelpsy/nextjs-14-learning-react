export type IPost = {
  id: number;
  author: string;
  body: string;
}

export type IPostData = Omit<IPost, 'id'>;