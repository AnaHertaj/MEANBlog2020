import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  baseUrl: string;
  baseUrlId: string;

  posts: Post[]; //listado

  post: Post; //detalle

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:3000/api/posts';
    this.baseUrlId = 'http://localhost:3000/api/posts/:postId';
  }

  getAll(): Promise<Post[]> {
    return this.httpClient.get<Post[]>(this.baseUrl).toPromise();
  }

  getPost(pId: number): Promise<Post> {
    return this.httpClient.get<Post>(this.baseUrl + '/' + pId).toPromise();
  }

  createPost(pFormValue) {
    return this.httpClient.post(this.baseUrl, pFormValue).toPromise();
  }
}
