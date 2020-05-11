import { Injectable } from '@angular/core';
import { User } from '../models/Usuario.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'https://identitytoolkit.googleapis.com/v1/';
  private apiKey = 'AIzaSyBGJYRNCDGosn8f9UepMrv-KdGi1Le0_Jc';
  private tokenId: string;
  
constructor(private http: HttpClient) { 
  this.getToken();
}

  public login(user: User): Observable<any> {
    const data = {
      email: user.email,
      password: user.password,
      returnSecureToken: true
    }
    const url = `${this.url}accounts:signInWithPassword?key=${this.apiKey}`;
    return this.http.post(url, data)
      .pipe(map(res => { 
        this.saveToken(res['idToken'])
        return res;
      }));
  }

  public logout() {
    localStorage.removeItem('token');
  }

  public register(user: User): Observable<any> {
    const data = {
      email: user.email,
      password: user.password,
      returnSecureToken: true
    }
    const url = `${this.url}accounts:signUp?key=${this.apiKey}`
    return this.http.post(url, data)
      .pipe(map(res => { 
        this.saveToken(res['idToken'])
        return res;
       }));
  }

  private saveToken(token: string): void {
    this.tokenId = token;
    localStorage.setItem('token', this.tokenId);
    let today = new Date();
    today.setSeconds(3600);
    localStorage.setItem('expire', today.getTime().toString());
  }

  private getToken(): void {
    if (localStorage.getItem('token')) {
      this.tokenId = localStorage.getItem('token');
    } else this.tokenId = '';
  }

  public isAuth(): boolean {
    if (this.tokenId.length < 2) return false;
    
    const expire = Number(localStorage.getItem('expire'));
    const expireDate = new Date();
    expireDate.setTime(expire);

    if (expireDate > new Date()) {
      return true;
    } else return false; 

  }
}
