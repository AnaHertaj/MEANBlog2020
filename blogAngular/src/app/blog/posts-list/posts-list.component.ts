import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/service/blog.service';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit {

  posts: Post[];

  pathImageUrl: any;

  constructor(
    private blogService: BlogService,
    private router: Router
  ) {

    // this.pathImageUrl = 'http://localhost:3000/images/uploads/';
    this.pathImageUrl = 'http://localhost:3000/';

  }

  ngOnInit(): void {
    this.blogService.getAll()
      .then(response => {
        console.log(response);
        if (response['Error']) {
          this.router.navigate(['/']);
        } else {
          this.posts = response;
        }
      })
      .catch(error => console.log(error));
  }

}
