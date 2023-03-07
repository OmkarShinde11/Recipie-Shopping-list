import { Component, Input, OnInit } from '@angular/core';
import { RecipesService } from 'src/app/Service/recipes.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css']
})
export class RecipesDetailComponent implements OnInit {
  @Input()recipeDetails:Recipe;
  constructor(private recipeService:RecipesService) { }

  ngOnInit(): void {
   
  }
  onAddShoppingList(){
    debugger;
    this.recipeService.sendIngredients(this.recipeDetails.ingredient)
  }

}
