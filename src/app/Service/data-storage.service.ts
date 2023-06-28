import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { RecipesService } from './recipes.service';
import {exhaustMap, map, take, tap} from 'rxjs/operators';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  userToken:string=null;
  constructor(private http:HttpClient,private recipeService:RecipesService,private authService:AuthService) { }

  storeRecipe(){
    const recipe=this.recipeService.getRecipe();
    this.http.put('https://recipe-shoppinglist-672ce-default-rtdb.firebaseio.com/Recipes.json',recipe).subscribe((resp)=>{
      console.log(resp);
    })
  }

  fetchRecipe(){
    debugger;
    return this.authService.userdata.pipe(take(1),exhaustMap(user=>{
      return this.http.get<Recipe[]>('https://recipe-shoppinglist-672ce-default-rtdb.firebaseio.com/Recipes.json',
      {
        params:new HttpParams().set('auth',user.token),
      })
    }),map((resp)=>{
      return resp.map((recipe=>{
        return {...recipe,ingredient:recipe.ingredient?recipe.ingredient:[]}
      }))
   }),tap(resp=>{
    this.recipeService.setRecipe(resp);
   }))
    
  }
}
