import { Injectable, Output } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GetMoviesService {
  private readonly movieApi: string;
  constructor(private http: HttpClient) {
    this.movieApi = `${environment.apiUrl}api/v1/movies`;
  }

  //looked at API and decided to use their discover call that only lets me return movies that are available to stream, also seperated out by the streaming service they are available on
  getPopular(): any {
    return this.http.get<any>(
      'https://api.themoviedb.org/3/discover/movie?api_key=e87d04bb91f28a1bb981bd4236e09b48&with_watch_providers=8|119|337|9|384|387|386|531&watch_region=US'
    );
  }
  getNowPlaying(): any {
    return this.http.get<any>(
      'https://api.themoviedb.org/3/movie/now_playing?api_key=e87d04bb91f28a1bb981bd4236e09b48&language=en-US&page=1'
    );
  }

  getProviders(movie_id: any): any {
    return this.http.get<any>(
      'https://api.themoviedb.org/3/movie/' +
        `${movie_id}` +
        '/watch/providers?api_key=e87d04bb91f28a1bb981bd4236e09b48'
    );
  }

  getTrailers(movie_id: any): any {
    return this.http.get<any>(
      'https://api.themoviedb.org/3/movie/' +
        `${movie_id}` +
        '/videos?api_key=e87d04bb91f28a1bb981bd4236e09b48'
    );
  }
//  Calls to our API

  getAllMovies() {
    debugger;
    return this.http.get<any>(`${this.movieApi}/index`);
  }

  createMovie(params) {
    return this.http.post<any>(`${this.movieApi}/create`, params);
  }
}
