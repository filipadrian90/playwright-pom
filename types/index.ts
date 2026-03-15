export interface User {
  id?: number;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  role?: "admin" | "user" | "guest";
}

export interface ApiUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface ApiResponse<T> {
  data: T;
}

export interface PaginatedResponse<T> {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: T[];
}

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}
