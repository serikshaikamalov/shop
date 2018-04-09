import { Component, OnInit } from '@angular/core';

// MODElS
import { ICategory } from './../../common/models/category.model';

// SERVICES
import { ShopService } from './../../common/_services/shop.service';
import { CategoryService } from './../../common/_services/category.service';

@Component({
    selector: 'category-component',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.css']    
})
export class CategoryComponent implements OnInit {
    
    public categoryId: number;
    public category: ICategory;
    public categoryIds: number[];
    public categoryList: ICategory[] = [];
    public selectedCategoryIds: ICategory[] = [];

    public firstCategoryId: number;
    public secondCategoryId: number;
    public thirthCategoryId: number;

    public firstLevelCategoryId: number = 0;
    public secondLevelCategoryId: number = 0;
    public thirthLevelCategoryId: number = 0;


    // Loader
    public loading: boolean = false;
    
    constructor(
        private service: CategoryService,
        private shopService: ShopService        
    ){}        

    ngOnInit() {
        console.log('Component: Category Component');        
        this.loadCategories();        
    }


    public async loadCategories(page: number = 1)
    {                  
        this.loading = true;      
        await this.service
                .getAll()                
                .subscribe(data => {                                                                       
                    this.categoryList = data;                        
                },
                () =>{}, 
                ()=>{
                    this.loading = false;
                }
                );
    }


    /**
     * TRIGGER
     */
    public changeCategory( category: ICategory ){
        console.log('Category: ', category);
        
        this.categoryId = category.Id;
        this.category = category;                
        

        // Send to subscriber
        this.shopService.toggle( this.category );
    }

}