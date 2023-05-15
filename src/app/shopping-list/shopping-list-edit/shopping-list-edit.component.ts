import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ShoppingListService } from 'src/app/Service/shopping-list.service';
import { Ingredient } from 'src/app/Shared/ingedients.model';



@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit {
  ingredientName:string;
  ingredientAmount:number;
  editedtItem:any;
  editmode=false;
  editindex:any;
  ingredients:Ingredient[];
  @Output()itemAdd=new EventEmitter<Ingredient>()

  constructor(private shoppingListService:ShoppingListService) { } 
  @Input()id:number;
  ngOnInit(): void {
    this.shoppingListService.edit.subscribe((resp)=>{
      console.log(resp);
      this.editedtItem=this.shoppingListService.getIngredient(resp);
      this.editindex=resp
      console.log(this.editedtItem);
      this.editmode=true;
      this.ingredientName=this.editedtItem.name;
      this.ingredientAmount=this.editedtItem.amount;
    })
    this.ingredients=this.shoppingListService.getIngredientsArray()
  }

  add(form:NgForm){
    // const data=new Ingredient(this.ingredientName,this.ingredientAmount);
    // this.itemAdd.emit(new Ingredient(this.ingredientName,this.ingredientAmount))
    debugger;
    if(this.editmode){
      this.shoppingListService.updateIngredient(this.editindex,new Ingredient(this.ingredientName,this.ingredientAmount))
      
    }
    else{
      this.shoppingListService.addShopping_item(new Ingredient(this.ingredientName,this.ingredientAmount))
      
    }
    form.reset();
    this.editmode=false
  }

    clear(form:NgForm){
      form.reset();
      this.editmode=false
    }
  
  delete(form:NgForm){
    this.shoppingListService.deleteIngredient(this.editindex);
    this.clear(form)
  }
  
}
