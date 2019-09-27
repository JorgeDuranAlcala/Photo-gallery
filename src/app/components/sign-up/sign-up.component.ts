import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(private service: UserService, private route: Router ) { }

  ngOnInit() {
  }

  registerNewUser(username: HTMLInputElement, email: HTMLInputElement, password: HTMLInputElement): boolean {
      
      this.service.registerUser(username.value, email.value, password.value)
      .subscribe( 
        r  => {
          localStorage.setItem('token', r.token)
          this.route.navigate(['/logIn'])
          }, 
        error => console.error(error))
      return false
  }

}
