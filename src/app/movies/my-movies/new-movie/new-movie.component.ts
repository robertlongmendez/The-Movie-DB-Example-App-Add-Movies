import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../auth/user.model';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {AuthService} from '../../../auth/auth.service';
import {GetMoviesService} from '../../../shared/services/get-movies.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-movie',
  templateUrl: './new-movie.component.html',
  styleUrls: ['./new-movie.component.scss']
})
export class NewMovieComponent implements OnInit, OnDestroy {
  form: FormGroup;
  formValues: any;
  submitting = false;
  hasError = false;
  errorMsg: string;
  currentUser: User;
  // Static Movie Ratings List
  movieRatings = [
    { id: 1, val: 'G' },
    { id: 2, val: 'PG' },
    { id: 3, val: 'PG-13' },
    { id: 4, val: 'R' },
    { id: 5, val: 'NC-17' },
  ];

  private subs = new Subscription();
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: AuthService,
    private movieService: GetMoviesService,
  ) {
    this.currentUser = this.userService.currentUserValue;
  }

  ngOnInit(): void {
    this.createFormControls();
    this.createForm();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  createFormControls() {
    this.formValues = {
      title: ['', Validators.compose([Validators.required])],
      description: ['', Validators.compose([Validators.required])],
      rating: ['', Validators.compose([Validators.required])],
      releaseDate: ['', Validators.compose([Validators.required])],
      totalGross: [null, Validators.compose([Validators.required])],
      duration: [null, Validators.compose([Validators.required])],
      img: [''],
      cast: ['', Validators.compose([Validators.required])],
      director: ['', Validators.compose([Validators.required])],
    };
  }

  createForm() {
    this.form = this.fb.group(this.formValues);
  }

  submitForm() {
    this.hasError = false;
    this.submitting = true;
    if (this.form.invalid) {
      this.hasError = true;
      this.submitting = false;
      return;
    }
    const form = this.form.value;
    const token = this.currentUser.token;
    const releaseDate = new Date(form.releaseDate);
    const year = releaseDate.getFullYear();
    const params = {
        title: form.title,
        description: form.description,
        rating: 5,
        parental_rating: form.rating,
        release_date: releaseDate,
        year,
        total_gross: form.totalGross,
        duration: form.duration,
        image: '',
        cast: form.cast,
        director: form.director,
      };
    this.subs.add(
        this.movieService.createMovie(params).subscribe(
          (data) => {
            if (data) {
              this.submitting = false;
              Swal.fire({
                icon: 'success',
                title: 'A new movie has been successfully added!',
                showConfirmButton: false,
                timer: 2000
              }).then(() => {
                this.form.reset();
              });
            }
          },
          (error) => {
            if (error) {
              console.log(error);
              this.submitting = false;
              this.hasError = true;
              this.errorMsg =
                'Something went wrong while trying to create that movie!!';
            }
          }
        )
      );
    }

  cancel() {
    this.form.reset();
  }

}
