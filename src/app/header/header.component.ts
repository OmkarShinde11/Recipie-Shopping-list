import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../Service/auth.service';
import { DataStorageService } from '../Service/data-storage.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../app.reducer';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output()select=new EventEmitter<string>();
  isAuthenticated=false;
  constructor(private dataStorage:DataStorageService,private authService:AuthService,private router:Router,private store:Store<fromApp.AppState>) { }

  ngOnInit(): void {
    // this.authService.userdata.subscribe(user=>{
    //   this.isAuthenticated=user?true:false;
    //   console.log(this.isAuthenticated);
    //   this.router.navigate(['/recipes'])
    // })
    console.log('ebgu')
    this.store
      .select('auth')
      .pipe(map((authState) => {
        // console.log(authState);
        return authState.user
      }))
      .subscribe((user) => {
        console.log(user);
        this.isAuthenticated = !!user;
        this.router.navigate(['/recipes'])
      });
  }

  onSelect(navigation:string){
    this.select.emit(navigation)
  }
  onSaveData(){
    debugger
     this.dataStorage.storeRecipe();
  }
  onFetchData(){
    this.dataStorage.fetchRecipe().subscribe();
  }

  logOut(){
    this.authService.logOut();
  }

}
