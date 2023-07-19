import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeActivateGuard } from '../Guard/recipe-activate.guard';
import { ReciprResolverService } from '../Service/recipr-resolver.service';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipesDetailComponent } from './recipes-detail/recipes-detail.component';
import { RecipesComponent } from './recipes.component';

const routes: Routes = [
  
  {
    path:'',
    component:RecipesComponent,
    canActivate:[RecipeActivateGuard],
    resolve:[ReciprResolverService],
    children:[
      {
        path:'',
        component:RecipeStartComponent,
      },
      {
        path:'new',
        component:RecipeEditComponent
      },
      {
        path:':id',
        component:RecipesDetailComponent,
        // resolve:[ReciprResolverService]
      },
      {
        path:':id/edit',
        component:RecipeEditComponent,
        // resolve:[ReciprResolverService]
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipeRoutingModule { }
