import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import swal from "sweetalert2";

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

    const swalWithBootstrapButtons = swal.mixin({
      customClass: {
        cancelButton: 'btn-danger'
      },
    })


    swalWithBootstrapButtons.fire({
      title: 'Do you really want to sign up ?',
      icon: 'question',
      confirmButtonText: 'Accept',
      showCancelButton: true,
      cancelButtonText: 'cancel',
      customClass: { cancelButton: 'btn btn-danger', confirmButton: 'btn btn-success' }
    }).then(result => {
      if(result.value) {
        this.service.registerUser(username.value, email.value, password.value)
        .subscribe( 
          r  => {
            localStorage.setItem('token', r.token)
            this.route.navigate(['/logIn'])
            }, 
          error => swal.fire({title: error.error.message, icon: 'error'}))
      } else if(result.dismiss === swal.DismissReason.cancel) {
          swal.fire({title: 'Canceled', icon: 'warning'})
      }
    })  



      return false
  }

  test() {
    
  }

}
