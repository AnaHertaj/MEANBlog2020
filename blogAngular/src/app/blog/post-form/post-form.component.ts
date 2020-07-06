import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/service/blog.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpHeaders, HttpRequest, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {

  //pathImageUrl: any;

  form: FormGroup;
  images;

  constructor(
    private blogService: BlogService,
    private router: Router//,
    //private http: HttpClient
  ) {

    //this.pathImageUrl = 'http://localhost:3000/images/uploads/';
    //this.pathImageUrl = 'http://localhost:3000/';

    this.form = new FormGroup({
      titulo: new FormControl(),
      contenido: new FormControl(),
      categoria: new FormControl()//,
      //url_imagen: new FormControl()
    })
  }

  ngOnInit(): void {

  }

  onSubmit() {
    // Creación del objeto donde incluimos todos los campos del formulario y además la imagen
    let fd = new FormData();
    fd.append('url_imagen', this.images[0]);
    fd.append('titulo', this.form.value.titulo);
    fd.append('categoria', this.form.value.categoria);
    fd.append('contenido', this.form.value.contenido);

    // Delegamos el envío del formulario en el servicio
    this.blogService.createPost(fd).then(result => {
      this.router.navigate(['/blog/posts']);
    })
  }

  selectImage($event) {
    this.images = $event.target.files;
  }

  // selectImage(event) {
  //   if (event.target.files.length > 0) {
  //     const file = event.target.files[0];
  //     this.images = file;
  //   }
  // }

  // async onSubmit() {

  //   const formData = new FormData();
  //   formData.append('url_imagen', this.images[0]);
  //   formData.append('titulo', this.form.value.titulo);
  //   formData.append('categoria', this.form.value.categoria);
  //   formData.append('contenido', this.form.value.contenido);

  //   console.log(this.form.value);

  //   // Delegamos el envío del formulario en el servicio
  //   this.blogService.createPost(formData).then(result => {
  //     this.router.navigate(['/blog/posts']);
  //   })
  // }

}
