import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthComponent} from './auth/auth.component';
import {MoviesComponent} from './movies/movies.component';
import {AuthGuard} from './auth/auth.guard';
import {NewMovieComponent} from './movies/my-movies/new-movie/new-movie.component';

const routes: Routes = [
  { path: '',
    redirectTo: 'movies',
    pathMatch: 'full'
  },
  {
    path: 'movies',
    pathMatch: 'full',
    component: MoviesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'home',
    pathMatch: 'full',
    component: MoviesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'movies/new',
    pathMatch: 'full',
    component: NewMovieComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    pathMatch: 'full',
    component: AuthComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
