import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { UserModel } from '../models/user-model';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private DataUserSource = new BehaviorSubject('');
  currentDataUser = this.DataUserSource.asObservable();

changeDataUser(message: any) {
    this.DataUserSource.next(message)
}

  
  constructor(private http: HttpClient) { }


  getUsers(page:number):Observable<any> {
    return this.http.get(`${environment.baseApi}?page=${page}`).pipe(
      map((response: any) => response),
      catchError((error) => {
        console.log(`${environment.baseApi}?page=${page}`)
        console.error('Error fetching users: ', error);
        return of([]);
      })
    );
  }

getUserById(userId: number): Observable<UserModel> {
    return this.http.get<UserModel>(`${environment.baseApi}/${userId}`);
}


 
}
