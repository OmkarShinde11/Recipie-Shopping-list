import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { RecipesService } from './recipes.service';
import {exhaustMap, map, take, tap} from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../app.reducer'
import  * as fromRecipe from '../recipes/store/recipe.action';
@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  userToken:string=null;
  constructor(private http:HttpClient,private recipeService:RecipesService,private authService:AuthService,private store:Store<fromApp.AppState>) { }

  storeRecipe(){
    const recipe=this.recipeService.getRecipe();
    this.http.put('https://recipe-shoppinglist-672ce-default-rtdb.firebaseio.com/Recipes.json',recipe).subscribe((resp)=>{
      console.log(resp);
    })
  }

  fetchRecipe(){
  //   return this.authService.userdata.pipe(take(1),exhaustMap(user=>{
  //     return this.http.get<Recipe[]>('https://recipe-shoppinglist-672ce-default-rtdb.firebaseio.com/Recipes.json',
  //     {
  //       params:new HttpParams().set('auth',user.token),
  //     })
  //   }),map((resp)=>{
  //     return resp.map((recipe=>{
  //       return {...recipe,ingredient:recipe.ingredient?recipe.ingredient:[]}
  //     }))
  //  }),tap(resp=>{
  //   this.recipeService.setRecipe(resp);
  //  }))
  return this.store.select('auth').pipe(
    take(1),
    map((auth)=>auth.user),
    exhaustMap((user)=>{
      return this.http.get<Recipe[]>('https://recipe-shoppinglist-672ce-default-rtdb.firebaseio.com/Recipes.json'
      // {
      //   params:new HttpParams().set('auth',user.token),
      // }
      )
    }),
    map((resp)=>{
      return resp.map((recipe=>{
              return {...recipe,ingredient:recipe.ingredient?recipe.ingredient:[]}
            }))
    }),
    tap((res)=>{
      this.recipeService.setRecipe(res);
    })
  )

  // return this.store.select('auth').pipe(
  //   take(1),
  //   map((auth)=>auth.user),
  //   tap(()=>{
  //     return this.store.dispatch(fromRecipe.fetchRecipe());
  //   })
  // )
    
  }
}
