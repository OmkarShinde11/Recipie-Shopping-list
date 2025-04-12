import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { exhaustMap, map, take } from 'rxjs/operators';
import { AuthService } from '../Service/auth.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../app.reducer';
@Injectable({
  providedIn: 'root'
})
export class SendDataService implements HttpInterceptor{

  constructor(private authService:AuthService,private store:Store<fromApp.AppState>) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //  return this.authService.userdata.pipe(take(1),exhaustMap(user=>{
  //   if(!user){
  //     return next.handle(req);
  //   }
  //    const modifiedreq=req.clone(
  //     {
  //       params:new HttpParams().set('auth',user.token)
  //     }
  //    )
  //    return next.handle(modifiedreq);
  //  }))
  // }
  return this.store.select('auth').pipe(
    take(1),
    map(authState=>authState.user),
    exhaustMap((user)=>{
      if(!user){
        return next.handle(req);
      }
      let modifiedreq=req.clone(
        {
          params:new HttpParams().set('auth',user.token)
        }
      );
      return next.handle(modifiedreq);
    })
  )
}}
