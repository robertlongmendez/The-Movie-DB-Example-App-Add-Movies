import {Component, Input, OnInit} from '@angular/core';
import {MyMovies} from '../../../shared/models/my-movies.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {

  @Input() movie: MyMovies;
  movieImg: string;
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    if (this.movie) {
      this.movieImg = this.movie.image;
    }
  }

  setDefaultPic() {
    this.movieImg = 'assets/images/batman-vs-godzilla.png';
  }

  // TODO: BUILD ME!!
  // routeToViewMovie(id: number) {
  //   this.router.navigate([`/movies/${id}`]);
  // }

}
