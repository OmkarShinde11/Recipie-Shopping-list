import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from '../alert/alert.component';
import { DropDpwnToggleDirective } from './drop-dpwn-toggle.directive';
import { PlaceholderDirective } from './placeholder.directive';



@NgModule({
  declarations: [
    AlertComponent,
    PlaceholderDirective,
    DropDpwnToggleDirective,
  ],
  imports: [
    CommonModule
  ],
  exports:[
    AlertComponent,
    PlaceholderDirective,
    DropDpwnToggleDirective,
    CommonModule
  ]
})
export class SharedModule { }
