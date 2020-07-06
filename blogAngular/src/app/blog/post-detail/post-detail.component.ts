import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from 'src/app/service/blog.service';
import { Post } from 'src/app/models/post.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {

  pathImageUrl: any;

  post: Post;

  constructor(
    private activatedRouted: ActivatedRoute,
    private blogService: BlogService,
    private router: Router
  ) {

    // this.pathImageUrl = 'http://localhost:3000/images/uploads/';
    this.pathImageUrl = 'http://localhost:3000/';

  }

  ngOnInit(): void {
    this.activatedRouted.params.subscribe(async params => {
      console.log(params);
      this.post = await this.blogService.getPost(params.postId);
      console.log(this.post);
      // console.log(this.post);
    });
  }
}
