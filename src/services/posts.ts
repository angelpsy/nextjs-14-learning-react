class PostsService {
  private static instance: PostsService;
  private baseUrl: string;

  private constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  public static getInstance(baseUrl: string): PostsService {
    if (!PostsService.instance) {
      PostsService.instance = new PostsService(baseUrl);
    }
    return PostsService.instance;
  }

  async createPost(author: string, body: string) {

    const response = await fetch(`${this.baseUrl}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ author, body }),
    });
    return response.json();
  }

  async getPosts() {
    const response = await fetch(`${this.baseUrl}/posts`);
    return response.json();
  }

  async getPostById(id: number) {
    const response = await fetch(`${this.baseUrl}/posts/${id}`);
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Post not found');
    }
  }

  async updatePost(id: number, author: string, body: string) {
    const response = await fetch(`${this.baseUrl}/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ author, body }),
    });
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Post not found');
    }
  }

  async deletePost(id: number) {
    const response = await fetch(`${this.baseUrl}/posts/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      return 'Post deleted successfully';
    } else {
      throw new Error('Post not found');
    }
  }
}

export default PostsService;