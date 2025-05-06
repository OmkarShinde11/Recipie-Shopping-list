import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Recipe } from '../recipes/recipe.model';
import { DataStorageService } from './data-storage.service';
import { RecipesService } from './recipes.service';
import { Store } from '@ngrx/store';
import * as fromApp from '.././app.reducer'
import * as recipeAction from '../recipes/store/recipe.action'
import { map, switchMap, take } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ReciprResolverService implements Resolve<Recipe[]>{

  constructor(private recipeService:RecipesService,private dataStorage:DataStorageService,private store:Store<fromApp.AppState>) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<Recipe[]> {
    // return this.dataStorage.fetchRecipe();
    return this.store.select('recipe').pipe(
      take(1),
      map((recipeState)=>recipeState.recipe),
      switchMap((recipe)=>{
        if(recipe.length==0){
          this.store.dispatch(recipeAction.fetchRecipe());
          return of([]);
        }
        else{
          return of(recipe);
        }
      })
    )
  }
}
