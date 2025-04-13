import { createReducer, on } from "@ngrx/store";
import { Ingredient } from "src/app/Shared/ingedients.model";
import * as shoppingList from './shopping-list.action'
export interface State{
    ingredients:Ingredient[],
    editedIndex:number;
    editIngredient:Ingredient,
}
let initialState:State={
    ingredients:[new Ingredient('Apple',10),new Ingredient('Banana',5)],
    editedIndex:-1,
    editIngredient:null,
}
export const shopListReducer=createReducer(initialState,
    on(shoppingList.addIngredients,(state,action)=>{
        return {
            ...state,
            ingredients:[...state.ingredients,action.ingredient]
        }
    }),
    on(shoppingList.editIngredient,(state,action)=>{
        const updateIngredient=action.ingredient;
        const ingredient=[...state.ingredients];
        ingredient[action.editIndex]=updateIngredient;
        return {
            ...state,
            ingredients:ingredient,
            editedIndex:-1,
            editIngredient:null
        }
    }),
    on(shoppingList.deleteIngredient,(state,action)=>{
        return{
            ...state,
            ingredients:state.ingredients.filter((item,index)=>{
                return index!==action.editIndex
            }),
            editedIndex:-1,
            editIngredient:null
        }
    }),
    on(shoppingList.startEdit,(state,action)=>{
        return {
            ...state,
            editIngredient:state.ingredients[action.index],
            editedIndex:action.index,
        }
    }),
    on(shoppingList.stopEdit,(state,action)=>{
        return{
            ...state,
            editedIndex:-1,
            editIngredient:null,
        }
    })
)