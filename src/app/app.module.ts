import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MoviesComponent } from './movies/movies.component';
import { MovieListComponent } from './movies/movie-list/movie-list.component';
import { StreamingComponent } from './movies/movie-list/streaming/streaming.component';
import { TrailersComponent } from './movies/movie-list/trailers/trailers.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthComponent } from './auth/auth.component';
import {AuthInterceptorService} from './auth/auth-interceptor.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import {FooterComponent} from './components/footer/footer.component';
import { MyMoviesComponent } from './movies/my-movies/my-movies.component';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import {
  faSpinner, faAngleLeft, faAngleRight, faPlus, faStar, faStarHalfAlt, faArrowRight, faUpload, faVideo,
  faEdit, faPen, faTrashAlt, faSearch, faUser, faKey, faEye, faEyeSlash, faSignInAlt, faSignOutAlt, faUserPlus, faCircle
} from '@fortawesome/free-solid-svg-icons';
import {MovieCardComponent} from './movies/my-movies/movie-card/movie-card.component';
import {NewMovieComponent} from './movies/my-movies/new-movie/new-movie.component';


@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    MovieListComponent,
    StreamingComponent,
    TrailersComponent,
    AuthComponent,
    NavbarComponent,
    FooterComponent,
    MyMoviesComponent,
    MovieCardComponent,
    NewMovieComponent
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, NgbModule, FormsModule, ReactiveFormsModule, FontAwesomeModule ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(
    private library: FaIconLibrary
  ) {
    this.library.addIcons(faVideo, faCircle, faSpinner, faAngleLeft, faAngleRight, faPlus, faStar, faStarHalfAlt, faArrowRight, faUpload,
      faEdit, faPen, faTrashAlt, faSearch, faUser, faKey, faEye, faEyeSlash, faSignInAlt, faSignOutAlt, faUserPlus)
  }
}
