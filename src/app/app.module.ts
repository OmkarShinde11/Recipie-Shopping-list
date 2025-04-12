import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

import { ShoppingModule } from './shopping-list/shopping.module';
import { SharedModule } from './Shared/shared.module';
import { SendDataService } from './InterCeptoe/send-data.service';
import { DataStorageService } from './Service/data-storage.service';
import { RecipesService } from './Service/recipes.service';
import { ShoppingListService } from './Service/shopping-list.service';
import { StoreModule } from '@ngrx/store';
import * as fromApp from './app.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffect } from './auth/store/auth.effect';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoadingSpinnerComponent,
   
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    StoreModule.forRoot(fromApp.appreducer),
    EffectsModule.forRoot([AuthEffect]),
  ],
  providers: [
    RecipesService,ShoppingListService,DataStorageService,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:SendDataService,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
