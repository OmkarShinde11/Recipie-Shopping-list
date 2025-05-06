import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as recipeAction from '../store/recipe.action';
import { of } from "rxjs";
import { catchError, exhaustMap, map, switchMap, tap, withLatestFrom } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Recipe } from "../recipe.model";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromApp from '../../app.reducer'
@Injectable()
export class recipeEffect{
    constructor(private actions$:Actions,private http:HttpClient,private store:Store<fromApp.AppState>){}

    fetchRecipe=createEffect(()=>
        this.actions$.pipe(
            ofType(recipeAction.fetchRecipe),
            switchMap(()=>{
               return this.http.get<Recipe[]>('https://recipe-shoppinglist-672ce-default-rtdb.firebaseio.com/Recipes.json').pipe(
                tap((res)=>{
                    console.log(res);
                }),
                map((recipeData)=>{
                    return recipeData.map(data=>{
                        return{
                            ...data,
                            ingredients:data.ingredient ? data.ingredient:[]
                        }
                    })
                }),
                map((recipes)=>{
                    return recipeAction.setRecip({recipe:recipes})
                })
               )
            })
        )
    );
    storeRecipe=createEffect(()=>
       this.actions$.pipe(
        ofType(recipeAction.storeRecipe),
        exhaustMap(()=>{
            return this.store.select('recipe');
        }),
        switchMap((recipeState)=>{
            return this.http.put('https://angular-test-fd57f-default-rtdb.firebaseio.com/recipes.json',recipeState.recipe);
        })
       ),
       {dispatch:false}
    )
}