import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../Shared/ingedients.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
   ingredients:Ingredient[]=[
    new Ingredient('Apple',5),
    new Ingredient('Banana',5),
    new Ingredient('Orange',5),
    {
      name:'mango',amount:6
    }
    
   ];
   
  constructor() { }

  ngOnInit(): void {
    console.log(this.ingredients)
    
  }
  addItem(item:Ingredient){
    this.ingredients.push(item)
    
  }

}
