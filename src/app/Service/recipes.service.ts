import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { Ingredient } from '../Shared/ingedients.model';
import { ShoppingListService } from './shopping-list.service';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  private recipe: Recipe[] = [
    new Recipe('Panner Chilly',
    'A Spicy Recipe',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStZGpfZpgvzwkX-xXMZ5hw8E5a0iaZCm5GYw&usqp=CAU',
    [new Ingredient('panner',12),new Ingredient('onion',2)]),

    new Recipe('Chicken Chilly',
    'A Spicy Recipe',
    'https://thumbs.dreamstime.com/b/chilli-chicken-plate-8401263.jpg',
    [new Ingredient('meat',30),new Ingredient('meat masala',12)])
  
  ];
  constructor(private shoppingListService:ShoppingListService) { }
  selectedRecipe=new EventEmitter<Recipe>();
  recipelength=this.recipe.length-1;
  getRecipe(){
    return this.recipe;
  }
  getRecipeID(index:number){
    debugger
    return this.recipe[index]
  }
  sendIngredients(ingredient:Ingredient[]){
    this.shoppingListService.addIngredients(ingredient)
  }


}
