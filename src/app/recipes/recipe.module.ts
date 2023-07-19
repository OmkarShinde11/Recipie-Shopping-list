import { NgModule } from '@angular/core';

import { RecipeRoutingModule } from './recipe-routing.module';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipesDetailComponent } from './recipes-detail/recipes-detail.component';
import { RecipesItemComponent } from './recipes-list/recipes-item/recipes-item.component';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { RecipesComponent } from './recipes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../Shared/shared.module';


@NgModule({
  declarations: [
    RecipesComponent,
    RecipesListComponent,
    RecipesDetailComponent,
    RecipesItemComponent,
    RecipeStartComponent,
    RecipeEditComponent,
  ],
  imports: [
    RecipeRoutingModule,
    FormsModule,ReactiveFormsModule,
    HttpClientModule,
    SharedModule
  ]
})
export class RecipeModule { }
