import { Component, OnInit } from '@angular/core';
import { AuthService } from './Service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private authService:AuthService){}
  ngOnInit(): void {
    this.authService.autoLogin();
  }
  title="Omakr Shinde"
  loadComponent:string='recipe'
  onClick(featured:string){
    this.loadComponent=featured
  }
}
