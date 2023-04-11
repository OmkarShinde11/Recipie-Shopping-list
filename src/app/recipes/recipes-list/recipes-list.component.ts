import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipesService } from 'src/app/Service/recipes.service';
import { Recipe } from '../recipe.model'
@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {
  recipe: Recipe[] = [
    // new Recipe('A test Recipe','A Spicy Recipe','https://cdn.healthyrecipes101.com/recipes/images/chickens/healthy-baked-chicken-breast-recipe-healthykitchen101-3-claxp3w5i00vs551b94x3bj7p.webp?w=1080&q=75'),
    // new Recipe('A First Recipe','A Sweet Recipe','https://cdn.healthyrecipes101.com/recipes/images/chickens/healthy-baked-chicken-breast-recipe-healthykitchen101-3-claxp3w5i00vs551b94x3bj7p.webp?w=1080&q=75')

  ];
  // @Output()passParentData=new EventEmitter<Recipe>()
  constructor(private recipeService:RecipesService,private router:Router,private route:ActivatedRoute) { }
  
  ngOnInit(): void {
   
    this.recipe=this.recipeService.getRecipe();
    console.log(this.recipe)
  }
  // acceptData(data:Recipe){
  //   this.passParentData.emit(data);
  // }
  naviagteNewRecipe(){
    this.router.navigate(['new'],{relativeTo:this.route})
  }

}