import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  searchTerm: string = '';
  dataSearch: string = '';
  subscription!: Subscription;
  messageError: string = '';
  flagMessageError: boolean = false;
  constructor(private usersService: UserService, private router: Router) { }

  ngOnInit() {
    this.subscription = this.usersService.currentDataUser.subscribe((data) => {
      this.dataSearch = data;
    });
  }
  changeDataUser(newUser: any) {
    this.usersService.changeDataUser(newUser);
  }
  searchUser(): void {
    const userId = parseInt(this.searchTerm, 10);
    if (!isNaN(userId)) {
      this.usersService.getUserById(userId).subscribe({
        next: (user) => {
          if (user) {
            this.changeDataUser(user.data);
            this.router.navigate(['/reaultSearch']);
            this.flagMessageError = false;
          } else {
            this.showAlert('User not found');
          }
        },
        error: () => {
          this.showAlert('User not found');
          this.router.navigate(['/users']);
        },
      });
    } else {
      if (this.searchTerm != '') {
        this.router.navigate(['/users']);
        this.showAlert('Invalid user ID');
      } else {
        this.router.navigate(['/users']);
      }
    }
  }

  showAlert(mes: string): void {
    this.messageError = mes;
    this.flagMessageError = true;

    setTimeout(() => {
      this.flagMessageError = false;
    }, 5000);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
