import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ShoppingListService } from '../Service/shopping-list.service';
import { Ingredient } from '../Shared/ingedients.model';
import { Store } from '@ngrx/store';
import * as fromApp from '../app.reducer'
import { Observable } from 'rxjs';
import * as shoppingListAction from './store/shopping-list.action'


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
   ingredients;
  constructor(private shoppingListService:ShoppingListService,private store:Store<fromApp.AppState>) { }

  ngOnInit(): void {
    // console.log(this.ingredients)
    // this.ingredients=this.shoppingListService.ingredients;
    this.store.select('shopping').subscribe((data)=>{
      this.ingredients=data.ingredients;
    });
   console.log(this.ingredients);
    
  }
  // addItem(item:Ingredient){
  //   this.ingredients.push(item)
    
  // }
  onEdit(id){
    // this.shoppingListService.edit.next(id)
    this.store.dispatch(shoppingListAction.startEdit({index:id}));
  }

}
