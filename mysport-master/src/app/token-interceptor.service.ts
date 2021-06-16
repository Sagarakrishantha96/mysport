import { Injectable , Injector, INJECTOR} from '@angular/core';
import {HttpInterceptor,HttpRequest, HttpHandler, HttpEvent} from '@angular/common/http'
import {AuthService} from './auth.service'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private injector : Injector) { }

  intercept(req ,next){
    let authService=this.injector.get(AuthService)
    const currentUser = authService.currentUserValue;
    const isLoggedIn = currentUser && currentUser.token;

    if(isLoggedIn){
      let tokenizedReq = req.clone({
        setHeaders:{
          Authorization : `Bearer ${authService.getToken()}`,
          Email : authService.getEmail()
        }
      })
      return next.handle(tokenizedReq)
    }
    return next.handle(req)
  }
}
