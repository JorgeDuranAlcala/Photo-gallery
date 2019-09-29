import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  constructor(private service: UserService, private route: Router) { }

  ngOnInit() {
  }

  logInuser(email: HTMLInputElement, password: HTMLInputElement): boolean {
      this.service.logInUser(email.value, password.value)
      .subscribe( r => {
        localStorage.setItem('token', r.token)
        this.route.navigate(['/photos'])
      }, e => console.error(e))

      return false
  }

}