import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Users, IProfile } from '../interfaces/users.interface';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  value: string = 'application/json'
  url: string = `http://localhost:3100/api/users`;

  constructor(private http: HttpClient,
              private route: Router) {
   }

   registerUser(username: string, email: string, password: string) {
     return this.http.post<Users>(`${this.url}/register`, { username, email, password })
    }

    logInUser(email: string, password: string) {
      return this.http.post<Users>(`${this.url}/login`, { email, password })
    }

    loggedIn(): boolean {
      return !!localStorage.getItem('token')
    }

    logoutUser() {
      Swal.fire({title: `you're logout`, icon: 'success', timer: 2000})
      localStorage.removeItem('token')
      this.route.navigate(['/home'])
    }

    
    getToken() {
      return localStorage.getItem('token')
    }

    getProfile() {
      return this.http.get<IProfile>(`${this.url}/profile`);
    }

}
