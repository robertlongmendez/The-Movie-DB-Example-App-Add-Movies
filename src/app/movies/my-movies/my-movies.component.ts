import {Component, Input, OnInit} from '@angular/core';
import {MyMovies} from '../../shared/models/my-movies.model';
import {Router} from '@angular/router';
import {User} from '../../auth/user.model';
import {Subscription} from 'rxjs';
import {AuthService} from '../../auth/auth.service';
import {GetMoviesService} from '../../shared/services/get-movies.service';

@Component({
  selector: 'app-my-movies',
  templateUrl: './my-movies.component.html',
  styleUrls: ['./my-movies.component.scss']
})
export class MyMoviesComponent implements OnInit {
  movies: MyMovies[] = [];
  currentUser: User;
  private subs = new Subscription();

  constructor(
    private router: Router,
    private userService: AuthService,
    private movieService: GetMoviesService,
  ) {
    this.currentUser = this.userService.currentUserValue;
  }

  ngOnInit(): void {
    this.handleSubs();
  }

  handleSubs() {
    this.subToCurrentUser();
    this.retrieveAllMovies();
  }

  subToCurrentUser() {
    this.subs.add(
      this.userService.user.subscribe(user => {
        if (user) {
          this.currentUser = user;
        } else {
          this.currentUser = null;
        }
      })
    );
  }

  retrieveAllMovies() {
    this.subs.add( // adds a new subscription to the array
      this.movieService.getAllMovies().subscribe(data => { // get all movies
        if (data) {
          if (data) {
            const payload = data.payload;
            this.movies = payload.map(x => new MyMovies(x)); // maps the movies as an array of the Movie type
          } else {
            this.movies = [];
          }
        }
      }, error => {
        if (error) {
          console.error(error);
        }
      })
    );
  }

  routeToAddNewMovie() {
    this.router.navigate(['/movies/new']);
  }

  ngOnDestroy() {
    this.subs.unsubscribe(); // Destroy all subs to prevent memory leak
  }

}
