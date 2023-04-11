import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipesService } from 'src/app/Service/recipes.service';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipes-item',
  templateUrl: './recipes-item.component.html',
  styleUrls: ['./recipes-item.component.css']
})
export class RecipesItemComponent implements OnInit {
  @Input()recipeData:Recipe;
  @Input()recipeId:number;
  // @Output()data=new EventEmitter<void>()
  constructor(private recipeService:RecipesService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
  }
  passData(){
    // this.data.emit()
    // this.recipeService.selectedRecipe.emit(this.recipeData);
    this.router.navigate([this.recipeId],{relativeTo:this.route});
    console.log(this.recipeId);
    
    
  }

}
