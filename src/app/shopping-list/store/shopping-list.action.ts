import { createAction, props } from "@ngrx/store";
import { Ingredient } from "src/app/Shared/ingedients.model";

export let addIngredients=createAction('[shopping] addIngredients',props<{ingredient:Ingredient}>());

export let editIngredient=createAction('[shopping] editIngredient',props<{editIndex:number,ingredient:Ingredient}>());

export let deleteIngredient=createAction('[shopping] deleteIngredient',props<{editIndex:number}>());

export let startEdit=createAction('[shopping] startEdit',props<{index:number}>())

export let stopEdit=createAction('[shopping] stopEdit')
