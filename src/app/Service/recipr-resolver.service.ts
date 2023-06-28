import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Recipe } from '../recipes/recipe.model';
import { DataStorageService } from './data-storage.service';
import { RecipesService } from './recipes.service';

@Injectable({
  providedIn: 'root'
})
export class ReciprResolverService implements Resolve<Recipe[]>{

  constructor(private recipeService:RecipesService,private dataStorage:DataStorageService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.dataStorage.fetchRecipe();
  }
}
