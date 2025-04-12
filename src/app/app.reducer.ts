import { ActionReducerMap } from "@ngrx/store";
import * as fromAuth from './auth/store/auth.reducer';

export interface AppState{
    auth:fromAuth.State
}

export const appreducer:ActionReducerMap<AppState>={
    auth:fromAuth.authReducer
}