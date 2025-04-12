import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthAction from './auth.action';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from 'src/app/Service/Model/userModel';

interface AuthResponce {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}
@Injectable()
export class AuthEffect {
  constructor(private actions$: Actions, private http: HttpClient) {}
  private handleAuth(tokenExp,email,localId,token){
    const date=new Date(new Date().getTime() + tokenExp * 1000);
    const user=new User(email,localId,token,date);
    localStorage.setItem('user',JSON.stringify(user));
    return AuthAction.authSuccess({
        user,
        redirect:true,
    });
  }
  authLogin = createEffect(() => {
    return this.actions$.pipe(
        ofType(AuthAction.loginStart),
        switchMap((authData)=>{
            return this.http.post<AuthResponce>(
                'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
              environment.apiKey,
              {
                email: authData.email,
                password: authData.password,
                returnSecureToken: true,
              }
            ).pipe(tap((res)=>{
                console.log(res);
            }),map((res)=>{
                return this.handleAuth( +res.expiresIn,
                    res.email,
                    res.localId,
                    res.idToken)
            }),catchError((error)=>{
                return of(AuthAction.authFail());
            }))
        })
    )
  });
}
