import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../Service/auth.service';
import { map, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromApp from '../app.reducer';
@Injectable({
  providedIn: 'root'
})
export class RecipeActivateGuard implements CanActivate {
  constructor(private authService:AuthService,private router:Router,private store:Store<fromApp.AppState>){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // return this.authService.userdata.pipe(map(user=>{
      //    const auth=user?true:false
      //    if(auth){
      //      return true
      //    }
      //    return this.router.createUrlTree(['/auth'])
      // }))
      return this.store.select('auth').pipe(
        take(1),
        map((auth)=>{
          return auth.user;
        }),map((user)=>{
          const isAuth = !!user;
          if (isAuth) {
            return true;
          }
          return this.router.createUrlTree(['/auth']);
        })
      )
  }
  
}
