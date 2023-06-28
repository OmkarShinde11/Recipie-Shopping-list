import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../Service/auth.service';
import { DataStorageService } from '../Service/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output()select=new EventEmitter<string>();
  isAuthenticated=false;
  constructor(private dataStorage:DataStorageService,private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
    this.authService.userdata.subscribe(user=>{
      this.isAuthenticated=user?true:false;
      console.log(this.isAuthenticated);
      this.router.navigate(['/recipes'])
    })
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
