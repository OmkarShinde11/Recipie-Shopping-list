import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Recipe } from '../recipes/recipe.model';
import { Ingredient } from '../Shared/ingedients.model';
import { DataStorageService } from './data-storage.service';
import { ShoppingListService } from './shopping-list.service';

@Injectable({
  providedIn: 'root'
})
export class RecipesService implements OnInit {
  private recipe: Recipe[] = [
    // new Recipe('Panner Chilly',
    // 'A Spicy Recipe',
    // 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStZGpfZpgvzwkX-xXMZ5hw8E5a0iaZCm5GYw&usqp=CAU',
    // [new Ingredient('panner',12),new Ingredient('onion',2)]),

    // new Recipe('Chicken Chilly',
    // 'A Spicy Recipe',
    // 'https://thumbs.dreamstime.com/b/chilli-chicken-plate-8401263.jpg',
    // [new Ingredient('meat',30),new Ingredient('meat masala',12)])
  
  ];
  constructor(private shoppingListService:ShoppingListService) { }
  ngOnInit(){
    
  }
  selectedRecipe=new EventEmitter<Recipe>();
  recipelength=this.recipe.length-1;
  recipeChange=new Subject<Recipe[]>();
  getRecipe(){
    return this.recipe.slice();
  }
  setRecipe(recipes:Recipe[]){
    this.recipe=recipes;
    this.recipeChange.next(this.recipe.slice())
  }
  getRecipeID(index:number){
    return this.recipe[index];
  }
  sendIngredients(ingredient:Ingredient[]){
    this.shoppingListService.addIngredients(ingredient)
  }

  addRecipe(recipes:Recipe){
     this.recipe.push(recipes);
     this.recipeChange.next(this.recipe.slice())
  }
  updateRecipe(index:number,newRecipe:Recipe){
     this.recipe[index]=newRecipe;
     this.recipeChange.next(this.recipe.slice())
  }
  deleteRecipe(id:number){
    this.recipe.splice(id,1)
    this.recipeChange.next(this.recipe.slice())
  }

}
