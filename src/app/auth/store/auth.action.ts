import { createAction, props } from "@ngrx/store";
import { User } from "src/app/Service/Model/userModel";

export const loginStart=createAction('[auth] loginStart',props<{email:string,password:string}>());

export const authSuccess=createAction('[auth] authSuccess',props<{
    user:User,
    redirect:boolean,
  }>());

export const authFail=createAction('[auth] authFail');