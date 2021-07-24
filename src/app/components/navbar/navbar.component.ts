import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../../auth/user.model';
import {Subscription} from 'rxjs';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  currentUser: User;
  private subs = new Subscription();
  constructor(
    private userService: AuthService,
  ) {
    this.currentUser = this.userService.currentUserValue; // gets the currentUser value from the userService
  }

  ngOnInit(): void {
    this.subscribeToCurrentUser();
  }

  subscribeToCurrentUser(): void {
    this.subs.add( // creates a new subscription
      this.userService.user.subscribe(user => { // creates the subscription
        if (user) { // if the logged in users exists set that value in this component
          this.currentUser = user;
        } else { // else set the current user as null
          this.currentUser = null;
        }
      })
    );
  }

  logoutUser() {
    this.userService.logout();
  }

  ngOnDestroy() {
    this.subs.unsubscribe(); // destroy all subscriptions to prevent memory leak
  }

}
