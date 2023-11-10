import { Post } from '../types';
import { client } from '../utils/httpClient';

export function getUserPosts(userId: number) {
  return client.get<Post[]>(`/posts?userId=${userId}`)
}

export function deletePost(postId: number) {
  return client.delete<number>(`/posts/${postId}`)
}

export function createPost({ userId, title, body }: Omit<Post, 'id'>) {
  return client.post<Post>(`/posts`, { userId, title, body })
}

export function updatePost({ id, userId, title, body }: Post) {
  return client.patch<Post>(`/posts/${id}`, { userId, title, body })
}
