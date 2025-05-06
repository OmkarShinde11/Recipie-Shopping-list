import { createReducer, on } from "@ngrx/store";
import { Recipe } from "../recipe.model";
import * as recipeAction from '../store/recipe.action'

export interface State{
    recipe:Recipe[],
}

export let initialState:State={
    recipe:[],
}

export const recipeReducer=createReducer(initialState,
    on(recipeAction.setRecip,(state,action)=>{
        return {
            ...state,
            recipe:action.recipe,
        }
    }),
    on(recipeAction.updaeRecipe,(state,action)=>{
        let updatedRecipe=[...state.recipe];
        updatedRecipe[action.editIndex]=action.recipe;
        return{
            ...state,
            recipe:updatedRecipe,
        }
    }),
    on(recipeAction.deleteRecipe,(state,action)=>{
        return{
            ...state,
            recipe:state.recipe.filter((recipe,index)=>action.editIndex!==index)
        }
    }),
    on(recipeAction.addRecipe,(state,action)=>{
        return {
            ...state,
            recipe:[...state.recipe, action.recipe]
        }
    })
    );

