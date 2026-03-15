import { type APIRequestContext, expect } from "@playwright/test";

export interface JsonPlaceholderUser {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}

export interface JsonPlaceholderPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export class ApiClient {
  private readonly baseUrl: string;

  constructor(
    private readonly request: APIRequestContext,
    baseUrl = process.env.API_BASE_URL ?? "https://jsonplaceholder.typicode.com"
  ) {
    this.baseUrl = baseUrl;
  }

  async getUsers(): Promise<JsonPlaceholderUser[]> {
    const res = await this.request.get(`${this.baseUrl}/users`);
    expect(res.status()).toBe(200);
    return res.json();
  }

  async getUserById(id: number): Promise<JsonPlaceholderUser> {
    const res = await this.request.get(`${this.baseUrl}/users/${id}`);
    expect(res.status()).toBe(200);
    return res.json();
  }

  async createUser(payload: Partial<JsonPlaceholderUser>) {
    const res = await this.request.post(`${this.baseUrl}/users`, {
      data: payload,
    });
    expect(res.status()).toBe(201);
    return res.json();
  }

  async updateUser(id: number, payload: Partial<JsonPlaceholderUser>) {
    const res = await this.request.put(`${this.baseUrl}/users/${id}`, {
      data: payload,
    });
    expect(res.status()).toBe(200);
    return res.json();
  }

  async deleteUser(id: number) {
    const res = await this.request.delete(`${this.baseUrl}/users/${id}`);
    expect(res.status()).toBe(200);
  }
}