import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements  OnInit{
  loading:boolean;
  users: any[] = [];
  currentPage:number;
  total_pages!:number;
  constructor(private userService: UserService,private router: Router) {
    this.loading = false;
    this.currentPage = 1
  }

  ngOnInit(): void {
    this.showUsers();

  }
 
  showUsers(): void {
    this.loading = true;
    this.userService.getUsers(this.currentPage).subscribe({
      next: (users) => {
        this.users = users.data;
        this.total_pages = users.total_pages;
        this.loading = false;
      },
      error: (error) => {
        console.error('An error occurred while fetching users:', error);
        this.loading = false; 
      }
    });
  }

  viewUserDetail(userId: number): void {
    this.router.navigate(['/user', userId]);
  }


  onPageChange(page: number): void {
    if (page >= 1 && page <= this.total_pages) {
      this.currentPage = page;
      this.showUsers();
    }
  }

  getPages(): number[] {
    const pages: number[] = [];
    for (let i = 1; i <= this.total_pages; i++) {
      pages.push(i);
    }
    return pages;
  }

  // searchUser(): void {
  //   if (this.searchTerm.trim() !== '') {
  //     // Perform search for user by ID
  //     this.userService.getUserById(+this.searchTerm).subscribe(user => {
  //       if (user) {
  //         this.users = [user]; // Display search result
  //       } else {
  //         this.users = []; // Clear user list if no user found
  //       }
  //     });
  //   } else {
  //     this.showUsers(); // If search term is empty, display all users
  //   }
  // }
}