import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from "@angular/common/http"
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector) {}

  intercept(req, next) {

      let service =  this.injector.get(UserService) ;

      let tokenizedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${service.getToken()}`
        }
      })
      return next.handle(tokenizedReq)
  }
}
