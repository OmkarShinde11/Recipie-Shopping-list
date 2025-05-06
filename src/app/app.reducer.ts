import { ActionReducerMap } from "@ngrx/store";
import * as fromAuth from './auth/store/auth.reducer';
import * as fromShopping from './shopping-list/store/shopping-list.reducer'
import * as fromRecipe from './recipes/store/recipe-reducer';

export interface AppState{
    auth:fromAuth.State,
    shopping:fromShopping.State,
    recipe:fromRecipe.State,
}

export const appreducer:ActionReducerMap<AppState>={
    auth:fromAuth.authReducer,
    shopping:fromShopping.shopListReducer,
    recipe:fromRecipe.recipeReducer,
}