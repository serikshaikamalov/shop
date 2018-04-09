import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, Http } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

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
import { UploadImageComponent } from './common/components/upload-image/upload-image.component';

/**
 * Services
 */
import { PagerService } from './common/_services/pager.service';
import { ShopService } from './common/_services/shop.service';
import { CategoryService } from './common/_services/category.service';
import { ProductService } from './common/_services/product.service';
import { UploadImageService } from './common/_services/upload-image.service';


@NgModule({
  declarations: [
    AppComponent,
    ShopComponent,
    CategoryComponent,
    ItemsComponent,
    DetailsComponent,

    // Common components
    RecursiveListComponent,
    UploadImageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    ReactiveFormsModule    
  ],
  providers: [
    PagerService,
    ShopService,
    CategoryService,
    ProductService,
    UploadImageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
