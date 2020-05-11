import { Injectable } from '@angular/core';
import { User } from '../models/Usuario.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'https://identitytoolkit.googleapis.com/v1/';
  private apiKey = 'AIzaSyBGJYRNCDGosn8f9UepMrv-KdGi1Le0_Jc';
  
constructor(private http: HttpClient) { }

  login(user: User) {}

  logout() {}

  register(user: User): Observable<any> {
    const data = {
      email: user.email,
      password: user.password,
      returnSecureToken: true
    }
    const url = `${this.url}accounts:signUp?key=${this.apiKey}`
    return this.http.post(url, data);
  }
}
