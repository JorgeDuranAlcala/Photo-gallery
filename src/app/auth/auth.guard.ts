import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private service: UserService,
                private route: Router ) {}

    canActivate(): boolean {
      if (this.service.loggedIn()) {
        swal.fire({title: `you're logged in`, icon: 'success', timer: 2000})
        return true
      } else {
        this.route.navigate(['/logIn'])
        return false
      }
    }           
}
