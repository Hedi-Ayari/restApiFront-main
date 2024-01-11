import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../model/user';
import { BehaviorSubject, filter, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = "http://Localhost:8080/"
  private currentUserSubject = new BehaviorSubject<string>(JSON.parse(localStorage.getItem('user') || 'null'));
  // currentUser = this.currentUserSubject.asObservable().pipe(filter(user => user !== null && user !== 'null'));
  currentUser = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (user) {
      this.currentUserSubject.next(user);
    }
  }

  isAuthenticated() {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    return user !== null && user !== 'null';
  }

  signup(user: User) {
    return this.http.post<User>(`${this.url}Signup`, user).pipe(
      tap((response: User) => {
        localStorage.setItem('user', JSON.stringify(response.firstName));
        this.currentUserSubject.next(response.firstName);
      })
    )
  }

  login(user: User) {
    return this.http.post<User>(`${this.url}Login`, user).pipe(
      tap((response: User) => {
        localStorage.setItem('user', JSON.stringify(response.firstName));
        this.currentUserSubject.next(response.firstName);
      })
    )
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
    this.currentUserSubject.next('');
  }
}