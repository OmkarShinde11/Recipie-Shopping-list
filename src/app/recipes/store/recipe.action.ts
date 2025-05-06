import { createAction, props } from "@ngrx/store";
import { Recipe } from "../recipe.model";

export let fetchRecipe=createAction('[Recipe] getRecipe');

export let setRecip=createAction('[Recipe] setRecipe',props<{recipe:Recipe[]}>());

export let updaeRecipe=createAction('[Recipe] updateRecipe',props<{editIndex:number,recipe:Recipe}>());

export let deleteRecipe=createAction('[Recipe] deleteRecipe',props<{editIndex:number}>());

export let addRecipe= createAction('[Recipe] addRecipe',props<{recipe:Recipe}>());

export let storeRecipe=createAction('[Recipe] storeRecipe');