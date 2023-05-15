import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
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
   edit=new Subject<number>();
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
  getIngredient(id){
    return this.ingredients[id];
  }
  
  updateIngredient(index:number,ingredient:Ingredient){
    this.ingredients[index]=ingredient;
    return this.ingredients.slice()
  }
  deleteIngredient(index:number){
    debugger;
    console.log(this.ingredients)
    this.ingredients.splice(index,1);
    return this.ingredients.slice()
  }
  getIngredientsArray(){
    return this.ingredients.slice();
  }
}

