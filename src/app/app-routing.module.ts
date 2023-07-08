import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { RecipeActivateGuard } from './Guard/recipe-activate.guard';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipesDetailComponent } from './recipes/recipes-detail/recipes-detail.component';
import { RecipesItemComponent } from './recipes/recipes-list/recipes-item/recipes-item.component';
import { RecipesListComponent } from './recipes/recipes-list/recipes-list.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ReciprResolverService } from './Service/recipr-resolver.service';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'recipes',
    pathMatch:'full'
  },
  {
    path:'recipes',
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
  {
    path:'shopping-list',
    component:ShoppingListComponent,
  },
  {
    path:'auth',
    component:AuthComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
