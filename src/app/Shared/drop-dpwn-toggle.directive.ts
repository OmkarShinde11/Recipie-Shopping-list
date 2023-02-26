import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropDpwnToggle]'
})
export class DropDpwnToggleDirective {
  @HostBinding('class.open') toggle:boolean=false;
  @HostListener('click') change(){
    this.toggle=!this.toggle;
  }
  constructor() { }

}
