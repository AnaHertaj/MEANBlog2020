import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/service/blog.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

//import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {

  pathImageUrl: any;

  form: FormGroup;

  images;

  constructor(
    private blogService: BlogService,
    private router: Router,
    private http: HttpClient
  ) {

    //this.pathImageUrl = 'http://localhost:3000/images/uploads/';
    this.pathImageUrl = 'http://localhost:3000/';

    this.form = new FormGroup({
      titulo: new FormControl(),
      contenido: new FormControl(),
      categoria: new FormControl(),
      url_imagen: new FormControl()
    })
  }

  ngOnInit(): void {

  }

  selectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
    }
  }

  async onSubmit() {

    const formData = new FormData();
    formData.append('url_imagen', this.images);
    this.http.post<any>('http://localhost:3000/file', formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
    // const fakepath = `C:\fakepath\`
    console.log(this.form.value);
    const response = await this.blogService.createPost(this.form.value);
    console.log(response);
    this.router.navigate(['/blog/posts']);

  }

}
