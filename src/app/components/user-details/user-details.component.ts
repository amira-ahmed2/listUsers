import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UserModel } from 'src/app/models/user-model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit  {
  user:any;
  constructor(private location: Location,private route: ActivatedRoute, private http: UserService) { }
  
  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const userId = Number(params.get('id'));
        // console.log(userId)
        return this.http.getUserById(userId);
      })
    ).subscribe(user => {
      this.user = user.data;
      
    });
  }

  goBack(): void {
    this.location.back();
  }

  
}


