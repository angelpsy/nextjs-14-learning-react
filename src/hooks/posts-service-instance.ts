import PostsService from '../services/posts';

const usePostsService = (baseUrl: string) => {
  const postsService = PostsService.getInstance(baseUrl);

  return {
    fetchPosts: postsService.getPosts.bind(postsService),
    createPost: postsService.createPost.bind(postsService),
    updatePost: postsService.updatePost.bind(postsService),
    deletePost: postsService.deletePost.bind(postsService),
  };
};

export default usePostsService;