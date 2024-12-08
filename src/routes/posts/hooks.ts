import { useState } from "react";
import usePostsServiceInstance from '../../hooks/posts-service-instance';
import { IPost } from '../../types/posts';

export const usePosts = () => {
  const {
    getPosts: fetchPosts,
  } = usePostsServiceInstance();
  const [items, setItems] = useState<IPost[]>([]);

  const handleFetchPosts = () => {
    fetchPosts().then((data) => {
      setItems(data || []);
    });
  };

  return {
    items,
    handleFetchPosts,
  };
};
