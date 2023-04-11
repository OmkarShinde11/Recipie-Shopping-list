import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipesService } from 'src/app/Service/recipes.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css']
})
export class RecipesDetailComponent implements OnInit {
  // @Input()recipeDetails:Recipe;
  recipe:Recipe;
  id:number;
  constructor(private recipeService:RecipesService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
   this.route.params.subscribe((params:Params)=>{
    this.id=+params['id']
    this.recipe=this.recipeService.getRecipeID(this.id);
    console.log(this.id)
    
   })
   console.log(this.recipe)
  }
  onAddShoppingList(){
    debugger
    this.recipeService.sendIngredients(this.recipe.ingredient);
  }
  onEditRecipe(){
    this.router.navigate(['/recipes/'+this.id+'/edit'])

  }

}
