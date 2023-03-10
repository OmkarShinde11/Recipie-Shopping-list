import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model'
@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {
  recipe: Recipe[] = [
    new Recipe('A test Recipe','A Spicy Recipe','https://cdn.healthyrecipes101.com/recipes/images/chickens/healthy-baked-chicken-breast-recipe-healthykitchen101-3-claxp3w5i00vs551b94x3bj7p.webp?w=1080&q=75'),
    new Recipe('A First Recipe','A Sweet Recipe','https://cdn.healthyrecipes101.com/recipes/images/chickens/healthy-baked-chicken-breast-recipe-healthykitchen101-3-claxp3w5i00vs551b94x3bj7p.webp?w=1080&q=75')

  ];
  @Output()passParentData=new EventEmitter<Recipe>()
  constructor() { }
  
  ngOnInit(): void {
    console.log(this.recipe);
  }
  acceptData(data:Recipe){
    this.passParentData.emit(data);
  }

}