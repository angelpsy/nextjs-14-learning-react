import { BACKEND_URL } from '../env';
import PostsService from '../services/posts';

const usePostsService = (baseUrl: string = BACKEND_URL) => {
  const postsService = PostsService.getInstance(baseUrl);

  return {
    getPosts: postsService.getPosts.bind(postsService),
    getPostById: postsService.getPostById.bind(postsService),
    createPost: postsService.createPost.bind(postsService),
    updatePost: postsService.updatePost.bind(postsService),
    deletePost: postsService.deletePost.bind(postsService),
  };
};

export default usePostsService;