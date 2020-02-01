import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import swal from "sweetalert2";

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  constructor(private service: UserService, 
              private route: Router,
             ) { }


  ngOnInit() {
  }

  logInuser(email: HTMLInputElement, password: HTMLInputElement): boolean {
      this.service.logInUser(email.value, password.value)
      .subscribe( r => {
        localStorage.setItem('token', r.token)
        this.route.navigate(['/photos'])
      }, error => { 
        if(error.error.message) return swal.fire({title: `${error.error.message}`, icon: 'error'});
        swal.fire({title: `${error.error}`, icon: 'error'})
    })

      return false
  }

  

}
