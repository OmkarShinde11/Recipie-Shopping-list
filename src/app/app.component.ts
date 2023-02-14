import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loadComponent:string='recipe'
  onClick(featured:string){
    this.loadComponent=featured
  }
}
