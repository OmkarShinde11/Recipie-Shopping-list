import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ShoppingListService } from 'src/app/Service/shopping-list.service';
import { Ingredient } from 'src/app/Shared/ingedients.model';



@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit {
  ingredientName:string;
  ingredientAmount:number;
  @Output()itemAdd=new EventEmitter<Ingredient>()

  constructor(private shoppingListService:ShoppingListService) { } 
  @Input()id:number;
  ngOnInit(): void {
  }

  add(){
    // const data=new Ingredient(this.ingredientName,this.ingredientAmount);
    // this.itemAdd.emit(new Ingredient(this.ingredientName,this.ingredientAmount))
    this.shoppingListService.addShopping_item(new Ingredient(this.ingredientName,this.ingredientAmount))
  }
  delete(){
    
  }
}
