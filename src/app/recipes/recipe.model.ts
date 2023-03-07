import { Ingredient } from "../Shared/ingedients.model";

export class Recipe{
    constructor(public name:string,public description:string,public image:string,public ingredient:Ingredient[]){

    }
}