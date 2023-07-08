import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './Model/userModel';

interface AuthResponce{
  idToken:string,
  email:string,
  refreshToken:string,
  expiresIn:string,
  localId:string,
  registered?:boolean,
}

interface ResetPassword{
  email:string,
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenExpiration;
  userdata=new BehaviorSubject<User>(null);
  constructor(private http:HttpClient,private router:Router) { }

  SignUp(email:string,password:string){
    return this.http.post<AuthResponce>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCLWsmkdBjYu_85OQHGkBPfFedLHj3La1c',
    {
      email:email,
      password:password,
      returnSecureToken:true
    }
    ).pipe(catchError(this.handleError),tap(respData=>{
      
      this.Authentication(respData.email,respData.localId,respData.idToken,+respData.expiresIn)
    }))
  }

  Login(email:string,password:string){
    debugger
    return this.http.post<AuthResponce>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCLWsmkdBjYu_85OQHGkBPfFedLHj3La1c',{
      email:email,
      password:password,
      returnSecureToken:true,
    }).pipe(catchError(this.handleError),tap(respData=>{
      this.Authentication(respData.email,respData.localId,respData.idToken,+respData.expiresIn);
    }))
  }

  private handleError(errorResp:HttpErrorResponse){
    let errorMsg='';
    console.log(errorResp);
    errorMsg= errorResp.error.error.message
    console.log(errorMsg);
   
    return throwError(errorMsg)
  }

  private Authentication(email:string,userId:string,token:string,expiresIn:number){
    debugger;
     const ExpDate=new Date(new Date().getTime() + expiresIn*1000)
      console.log("Date "+new Date)
      console.log(ExpDate)
     const user= new User(email,userId,token,ExpDate);
     console.log(user);
     this.userdata.next(user);
     localStorage.setItem('userData',JSON.stringify(user));
      this.autoLogout(expiresIn*1000)
  }

  logOut(){
    this.userdata.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if(this.tokenExpiration){
      clearTimeout(this.tokenExpiration);
    }
  }

  autoLogin(){
    let autoUser=JSON.parse(localStorage.getItem('userData'));
    console.log(autoUser);

    const loadedUser=new User(autoUser.email,autoUser.userId,autoUser._token,autoUser._expirationDate);
    console.log(loadedUser);
    if(loadedUser.token){
      this.userdata.next(loadedUser);
      let expirationDuration=new Date(autoUser._expirationDate).getTime()-new Date().getTime();
      console.log(expirationDuration);
      this.autoLogout(expirationDuration)
    }
  }

  autoLogout(expirationTime){
    this.tokenExpiration=setTimeout(()=>{
      this.logOut();
    },expirationTime)
  }

  passwordRecovery(email){
    return this.http.post<ResetPassword>('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCLWsmkdBjYu_85OQHGkBPfFedLHj3La1c',{
      requestType:'PASSWORD_RESET',
      email:email
    }).pipe(catchError(this.passwordError))
  }

  private passwordError(errorResp:HttpErrorResponse){
    let password_Error=errorResp.error.error.message;
    return throwError(password_Error);
  }
}
