import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

interface Role {
  authority: string;
}

interface LoginResponse {
  user: any;
  jwt: string;
  authorities: Role[];
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/v1/auth';
  loggedIn = new EventEmitter<boolean>();

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((response) => {
        console.log('User ID:', response.user.id);
        localStorage.setItem('access_token', response.jwt);
        localStorage.setItem('user_id', response.user.id);
// Nếu response.authorities là mảng các object có field "authority"
      const roles = response.authorities.map((role: any) => role.authority);
      localStorage.setItem('roles', JSON.stringify(roles));       
       this.loggedIn.emit(true);
      })
    );
  }

  register(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { email, password });
  }
}
