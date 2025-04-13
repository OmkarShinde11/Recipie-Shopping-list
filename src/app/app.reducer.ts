import { ActionReducerMap } from "@ngrx/store";
import * as fromAuth from './auth/store/auth.reducer';
import * as fromShopping from './shopping-list/store/shopping-list.reducer'

export interface AppState{
    auth:fromAuth.State,
    shopping:fromShopping.State,
}

export const appreducer:ActionReducerMap<AppState>={
    auth:fromAuth.authReducer,
    shopping:fromShopping.shopListReducer
}