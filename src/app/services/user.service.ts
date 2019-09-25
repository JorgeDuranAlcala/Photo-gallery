import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Users } from '../interfaces/users.interface';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  value: string = 'application/json'
  url: string = `http://localhost:3000/api/users`;

  constructor(private http: HttpClient) {
   }

   registerUser(username: string, email: string, password: string) {
     return this.http.post<Users>(`${this.url}/register`, { username, email, password })
    }

    logInUser(email: string, password: string) {
      return this.http.post<Users>(`${this.url}/login`, { email, password })
    }
}
