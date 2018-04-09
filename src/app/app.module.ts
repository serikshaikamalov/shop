import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, Http } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';

/**
 * Components
 */
import { AppComponent } from './app.component';
import { ShopComponent } from './shop/shop.component';
import { CategoryComponent } from './shop/category/category.component';
import { ItemsComponent } from './shop/items/items.component';
import { DetailsComponent } from './shop/details/details.component';

// Common Components
import { RecursiveListComponent } from './common/components/recursive-list/recursive-list.component';

/**
 * Services
 */
import { PagerService } from './common/_services/pager.service';
import { ShopService } from './common/_services/shop.service';
import { CategoryService } from './common/_services/category.service';
import { ProductService } from './common/_services/product.service';

@NgModule({
  declarations: [
    AppComponent,
    ShopComponent,
    CategoryComponent,
    ItemsComponent,
    DetailsComponent,

    RecursiveListComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule    
  ],
  providers: [
    PagerService,
    ShopService,
    CategoryService,
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
