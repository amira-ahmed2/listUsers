import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-result-search',
  templateUrl: './result-search.component.html',
  styleUrls: ['./result-search.component.scss'],
})
export class ResultSearchComponent implements OnInit, OnDestroy{
  loading: boolean;
  searchData: any;
  subscription!: Subscription;

  constructor(
    private userService: UserService,
    private router: Router
  ) {
    this.loading = false;
  }

  ngOnInit(): void {
    this.subscription = this.userService.currentDataUser.subscribe(
      (data) => (this.searchData = data)
    );
  }
  viewUserDetail(userId: number): void {
    this.router.navigate(['/user', userId]);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
