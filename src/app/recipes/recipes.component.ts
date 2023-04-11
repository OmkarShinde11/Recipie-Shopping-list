import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../Service/recipes.service';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  childData:Recipe;
  constructor(private recipeService:RecipesService) { }

  ngOnInit(): void {
    // this.recipeService.selectedRecipe.subscribe((recipe:Recipe)=>{
    //   this.childData=recipe
    // })
  }
  // acceptChildData(data){
  //   this.childData=data
  //   console.log(this.childData);
  // }
}
