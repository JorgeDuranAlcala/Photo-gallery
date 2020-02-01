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

  constructor(private service: UserService, 
              private route: Router ) { }

  ngOnInit() {
  }

  registerNewUser(username: HTMLInputElement, email: HTMLInputElement, password: HTMLInputElement, repeatPassword: HTMLInputElement): boolean {

    const swalWithBootstrapButtons = swal.mixin({
      customClass: {
        cancelButton: 'btn btn-danger',
        confirmButton: 'btn btn-primary m-4'
      },
    })


    swalWithBootstrapButtons.fire({
      title: 'Do you really want to sign up ?',
      icon: 'question',
      confirmButtonText: 'Accept',
      showCancelButton: true,
      cancelButtonText: 'cancel',
    }).then(result => {
      if(result.value) {
        if (password.value !== repeatPassword.value) 
        { 
          swal.fire({title: `Both password need be equal`, icon: 'error' }) 
        }
        else {

          this.service.registerUser(username.value, email.value, password.value)
          .subscribe( 
          r  => {
            //localStorage.setItem('token', r.token)
            swal.fire({title: `congratulations ${username.value}`, text: `You're signed up`, icon: 'success', timer: 2000})
            this.route.navigate(['/logIn'])
          }, 
          error => {
            if(error.error.message) return swal.fire({title: `${error.error.message}`, icon: 'error'});
            swal.fire({title: `error`, text: error.error, icon: 'error'})
          }) 
        }
        } else if(result.dismiss === swal.DismissReason.cancel) {
          swal.fire({title: 'Canceled', icon: 'warning'})
      }
      })  
      
      return false
  }


}
