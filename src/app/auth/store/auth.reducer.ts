import { createReducer, on } from "@ngrx/store"
import { User } from "src/app/Service/Model/userModel"
import * as AuthAction from './auth.action'
export interface State{
    user:User,
    authError:string,
    loading:boolean,
}
const initialState:State={
    user:null,
    authError:null,
    loading:false,
}
export const authReducer=createReducer(initialState,
    on(AuthAction.loginStart,(state)=>{
        console.log(state);
        return {
            ...state,
            authError:null,
            loading:true
        }
    }),
    on(AuthAction.authSuccess,(state,action)=>{
        console.log(state,action);
        return {
            ...state,
            user:action.user,
            authError:null,
            loading:false,
        }
    })
    );