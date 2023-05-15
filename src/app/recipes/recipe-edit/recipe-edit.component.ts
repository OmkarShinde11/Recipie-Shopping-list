import { Component, OnInit } from '@angular/core';
import { Form, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipesService } from 'src/app/Service/recipes.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
   id:number;
   editmode=false;
   recipeForm:FormGroup
  constructor(private route:ActivatedRoute,private recipeService:RecipesService,private router:Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=>{
      this.id=+params['id']
      this.editmode=params['id']!=null;
      console.log(this.editmode);
      this.initmethod()
      // this.recipeForm=new FormGroup({
      //   recipeName:new FormControl('',Validators.required),
      //   recipeImage:new FormControl('',Validators.required),
      //   recipeDescription:new FormControl('',Validators.required),
      //   ingredientName:new FormControl('',Validators.required),
      //   ingredientAmount:new FormControl('',Validators.required)
      // })
    })
  }

  private initmethod(){
    let recipeName='';
    let recipeImage='';
    let recipeDescription='';
    let ingredients=new FormArray([]);
    if(this.editmode){
      const recipe=this.recipeService.getRecipeID(this.id);
      recipeName=recipe.name;
      recipeImage=recipe.image;
      recipeDescription=recipe.description;
      if(recipe.ingredient){
        for(let ing of recipe.ingredient){
          ingredients.push(
            new FormGroup({
              name:new FormControl(ing.name),
              amount:new FormControl(ing.amount),
            })
          )
        }
      }
    }
    this.recipeForm=new FormGroup({
      recipeName:new FormControl(recipeName,Validators.required),
      recipeImage:new FormControl(recipeImage,Validators.required),
      recipeDescription:new FormControl(recipeDescription,Validators.required),
      recipeIngredients:ingredients
     
    })
  }
  onSubmit(){
    console.log(this.recipeForm)
    if(this.editmode){
      this.recipeService.updateRecipe(this.id,new Recipe(this.recipeForm.value.recipeName,this.recipeForm.value.recipeDescription,this.recipeForm.value.recipeImage,this.recipeForm.value.recipeIngredients))
    }
    else{
      this.recipeService.addRecipe(new Recipe(this.recipeForm.value.recipeName,this.recipeForm.value.recipeDescription,this.recipeForm.value.recipeImage,this.recipeForm.value.recipeIngredients))
    }
    this.onCancle()
  }

  getIngredientControls(){
    return (<FormArray>this.recipeForm.get('recipeIngredients')).controls
  }

  addIngredient(){
    (<FormArray>this.recipeForm.get('recipeIngredients')).push(
      new FormGroup({
        name:new FormControl('',Validators.required),
        amount:new FormControl('',[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)]),
      })
    )
  }

  onCancle(){
    this.router.navigate(['../'],{relativeTo:this.route})
  }
  clearControls(numberControl:number){
    return (<FormArray>this.recipeForm.get('recipeIngredients')).removeAt(numberControl)
  }
}
