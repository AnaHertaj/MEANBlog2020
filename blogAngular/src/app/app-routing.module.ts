import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostsListComponent } from './blog/posts-list/posts-list.component';
import { PostFormComponent } from './blog/post-form/post-form.component';
import { PostDetailComponent } from './blog/post-detail/post-detail.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/' },
  { path: 'blog/posts', component: PostsListComponent },
  { path: 'blog/newPost', component: PostFormComponent },
  { path: 'blog/:postId', component: PostDetailComponent },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
