import { Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../Service/auth.service';
import { AlertComponent } from '../alert/alert.component';
import { PlaceholderDirective } from '../Shared/placeholder.directive';
import { catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromApp from '../app.reducer';
import * as AuthAction from '../auth/store/auth.action'
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
  @ViewChild(PlaceholderDirective)alertHost:PlaceholderDirective;
  constructor(private authService:AuthService,private componentFactory:ComponentFactoryResolver,private store:Store<fromApp.AppState>) { }

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
      // this.authService.Login(this.email,this.password).subscribe(respData=>{
      //   console.log(respData);
      //   this.isLoading=false
      // },errorMsg=>{
      //   console.log(errorMsg);
      //   this.error=errorMsg
      //   this.showErrorCmp(errorMsg)
      //   this.isLoading=false
      // })
      this.store.dispatch(AuthAction.loginStart({email:this.email,password:this.password}));
    }
    form.reset();
  }

  listenData(){
    this.error=null;
  }

  private showErrorCmp(errorMsg){
    const alertCmpFactory=this.componentFactory.resolveComponentFactory(AlertComponent);
    const viewAlertCmp=this.alertHost.viewContainerRef
    viewAlertCmp.clear();
    
    const alertCmp= viewAlertCmp.createComponent(alertCmpFactory);
    alertCmp.instance.message=errorMsg;
    alertCmp.instance.ActionClose.subscribe(()=>{
      viewAlertCmp.clear();
    })
  }  

  recoverPassword(){
    debugger;
    console.log('passwordRecovery',this.email)
    this.authService.passwordRecovery(this.email).subscribe(resp=>{
      console.log(resp);
      this.successDialog();
    },password_Error=>{
      this.passworderror(password_Error);
      console.log(password_Error);
    })
  }

  private passworderror(error){
    const cmpFactory=this.componentFactory.resolveComponentFactory(AlertComponent);
    const instancecmp=this.alertHost.viewContainerRef;
    instancecmp.clear();

    const showPasswordError=instancecmp.createComponent(cmpFactory);
    showPasswordError.instance.message=error;
    showPasswordError.instance.ActionClose.subscribe(()=>{
      instancecmp.clear();
    })
  }

  private successDialog(){
    const cmpFactory=this.componentFactory.resolveComponentFactory(AlertComponent);
    const instancecmp= this.alertHost.viewContainerRef;
    instancecmp.clear();

    const Successdialog=instancecmp.createComponent(cmpFactory);
    Successdialog.instance.message='For Reset the Password the mail is send on your verified Mail Id';
    Successdialog.instance.ActionClose.subscribe(()=>{
      instancecmp.clear();
    })
  }

 
}
