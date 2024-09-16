import { Post } from '../types/post';

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

  async createPost(author: string, body: string): Promise<Post> {

    const response = await fetch(`${this.baseUrl}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ author, body }),
    });
    return response.json();
  }

  async getPosts(): Promise<Post[]> {
    const response = await fetch(`${this.baseUrl}/posts`);
    return response.json();
  }

  async getPostById(id: number): Promise<Post> {
    const response = await fetch(`${this.baseUrl}/posts/${id}`);
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Post not found');
    }
  }

  async updatePost(id: number, author: string, body: string): Promise<Post> {
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

  async deletePost(id: number): Promise<void> {
    const response = await fetch(`${this.baseUrl}/posts/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      return;
    } else {
      throw new Error('Post not found');
    }
  }
}

export default PostsService;