import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipesService } from 'src/app/Service/recipes.service';
import { Recipe } from '../recipe.model';
import { map, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromApp from '../../app.reducer';
import * as recipeAction from '../store/recipe.action'
@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css']
})
export class RecipesDetailComponent implements OnInit {
  // @Input()recipeDetails:Recipe;
  recipe:Recipe;
  id:number;
  constructor(private recipeService:RecipesService,private route:ActivatedRoute,private router:Router,private store:Store<fromApp.AppState>) { }

  ngOnInit(): void {
  //  this.route.params.subscribe((params:Params)=>{
  //   this.id=+params['id']
  //   this.recipe=this.recipeService.getRecipeID(this.id);
  //   console.log(this.id)
    
  //  })
  //  console.log(this.recipe)
  this.route.params.pipe(
    map((params)=>{
      return +params['id']
    }),
    switchMap((id)=>{
      this.id=id;
      return this.store.select('recipe');
    }),
    map((recipeState)=>{
      console.log(recipeState.recipe);
      return recipeState.recipe;
    })
  ).subscribe((recipes)=>{
    this.recipe=recipes[this.id];
  })
  }
  onAddShoppingList(){
    debugger
    this.recipeService.sendIngredients(this.recipe.ingredient);
  }
  onEditRecipe(){
    this.router.navigate(['/recipes/'+this.id+'/edit'])

  }
  onDeleteRecipe(){
    // this.recipeService.deleteRecipe(this.id);
    this.store.dispatch(recipeAction.deleteRecipe({editIndex:+this.id}));
    this.router.navigate(['../'],{relativeTo:this.route})
    
  }

}
