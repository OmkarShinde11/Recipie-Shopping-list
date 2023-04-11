import { Injectable } from '@angular/core';
import { Ingredient } from '../Shared/ingedients.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredients:Ingredient[]=[
    new Ingredient('Apple',5),
    new Ingredient('Banana',5),
    new Ingredient('Orange',5),
    {
      name:'mango',amount:6
    }
    
   ];
  constructor() { }
  addShopping_item(data:Ingredient){
    this.ingredients.push(data)
  }
  deleteShopping_item(id:number){
    this.ingredients.splice(id,1)
  }
  addIngredients(ingredients:Ingredient[]){
    this.ingredients.push(...ingredients)
  }
}

