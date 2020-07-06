import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { PostsListComponent } from './blog/posts-list/posts-list.component';
import { PostFormComponent } from './blog/post-form/post-form.component';
import { PostDetailComponent } from './blog/post-detail/post-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    PostsListComponent,
    PostFormComponent,
    PostDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
