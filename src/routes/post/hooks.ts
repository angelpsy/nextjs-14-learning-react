import { useState } from "react";
import usePostsServiceInstance from '../../hooks/posts-service-instance';
import { IPost } from '../../types/posts';

export const usePost = (id: IPost['id']) => {
  const {
    getPostById,
  } = usePostsServiceInstance();
  const [item, setItem] = useState<IPost | null>(null);

  const handleFetchPost = () => {
    getPostById(id).then((data) => {
      setItem(data);
    });
  };

  return {
    item,
    handleFetchPost,
  };
};
