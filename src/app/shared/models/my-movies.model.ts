export class MyMovies {
  averageReview: number;
  createdAt: Date;
  director: string;
  duration: number;
  id: number;
  userId: number;
  image: string;
  parentalRating: string;
  rating: number;
  title: string;
  totalGross: number;
  year: number;
  description: string;
  cast: string;
  constructor({
                id = null,
                user_id = null,
                cast = '',
                description = '',
                director = '',
                image = '',
                title = '',
                year = null,
                parental_rating = '',
                rating = null,
                duration = null,
                total_gross = null,
                created_at = '',
                average_rating = 5.0,
                ...rest
              }) {
    Object.assign(this, rest);
    this.id = id;
    this.userId = user_id;
    this.cast = cast;
    this.description = description;
    this.director = director;
    this.image = image;
    this.title = title;
    this.year = year;
    this.parentalRating = parental_rating;
    this.rating = rating;
    this.duration = duration;
    this.totalGross = total_gross;
    this.averageReview = average_rating;
    this.createdAt = new Date(created_at);
    debugger;
  }

}
