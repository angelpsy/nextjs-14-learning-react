import { BACKEND_URL } from '../env';
import PostsService from '../services/posts';

export const postServiceInstance = PostsService.getInstance(BACKEND_URL);

const usePostsService = () => {
  return {
    getPosts: postServiceInstance.getPosts.bind(postServiceInstance),
    getPostById: postServiceInstance.getPostById.bind(postServiceInstance),
    createPost: postServiceInstance.createPost.bind(postServiceInstance),
    updatePost: postServiceInstance.updatePost.bind(postServiceInstance),
    deletePost: postServiceInstance.deletePost.bind(postServiceInstance),
  };
};

export default usePostsService;