export class Movies {
  // what you want to call in your app
  movie_id: number;
  title: string;
  overview: string;
  poster: string;

  constructor({
    //constructor is what comes back from the API
    id = 0,
    original_title = '',
    overview = '',
    poster_path = '',
    ...rest
  }) {
    Object.assign(this, rest);
    this.movie_id = id;
    this.title = original_title;
    this.overview = overview;
    this.poster = poster_path;
  }
}
