import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
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

  constructor() { } 

  ngOnInit(): void {
  }

  add(){
    // const newIngredient=new Ingredient(this.ingredientName,this.ingredientAmount);
    this.itemAdd.emit(new Ingredient(this.ingredientName,this.ingredientAmount))
  }
}
