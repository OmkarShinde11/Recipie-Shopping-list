import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Service/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode=true;
  isLoading=false;
  email;
  password;
  error:string;
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
  }

  switchMode(){
    this.isLoginMode=!this.isLoginMode;
  }

  onSubmit(form){
    console.log(form);
    this.isLoading=true;
    if(this.isLoginMode==false){
      this.authService.SignUp(this.email,this.password).subscribe(resp=>{
        console.log(resp)
        this.isLoading=false
      },
      errorMsg=>{
        console.log(errorMsg);
        this.error=errorMsg
        this.isLoading=false;
      })
     }
    else{
      this.authService.Login(this.email,this.password).subscribe(respData=>{
        console.log(respData);
        this.isLoading=false
      },errorMsg=>{
        console.log(errorMsg);
        this.error=errorMsg
        this.isLoading=false
      })
    }
    form.reset();
  }

  
}
