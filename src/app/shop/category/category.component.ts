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

    // Loader
    public loading: boolean = false;
    
    constructor(
        private service: CategoryService,
        private shopService: ShopService        
    ){}        

    ngOnInit() {
        console.log('Component: Category Component');

        //this.getCategories();        
        this.loadCategories();

        // Listener(Subscriber)
        this.shopService.change.subscribe(category => {            
            this.pushSelectedCategoryStorage( category );
            this.isActive(category);
        });
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
     * Get Categories
     * @returns void
     */
    public getCategories(): void{
        this.loading = true;        

        setTimeout(() =>{
            this.loading = false;
            this.categoryList.push(
                {
                    Id: 1,
                    Title: 'Одежда',
                    ParentId: 0,
                    StatusId: 1,
                    Level: 1,
                    Children: [
                        {
                            Id: 2,
                            Title: 'Мужская одежда',
                            ParentId: 1,
                            Level: 2,
                            Children: [
                                {
                                    Id: 3,
                                    Title: 'Верхная одежда',
                                    Level: 3,                                    
                                }
                            ]
                        },
                        {
                            Id: 4,
                            Title: 'Женская одежда',
                            ParentId: 1,
                            Level: 2,                  
                        }
                    ]
                },
                {
                    Id: 5,
                    Title: 'Обувь',
                    Level: 1,
                    ParentId: 0,
                    Children: [
                        {
                            Id: 7,
                            Title: 'Мужские'
                        },
                        {
                            Id: 8,
                            Title: 'Женские'
                        }
                    ]
                },
                {
                    Id: 6,
                    Title: 'Другие',
                    ParentId: 0,
                    Level: 1,
                    Children: [
                        {
                            Id: 9,
                            Title: 'Часы'                    
                        }
                    ]
                }
            );

            debugger;
        }, 1000);

        

        
    }

    /**
     * TRIGGER
     */
    public changeCategory( category: ICategory ){
        console.log('Category: ', category);

        this.categoryId = category.Id;
        this.category = category;
        
        // Store selected categories
        this.pushSelectedCategoryStorage( category );
        

        // Send to subscriber
        this.shopService.toggle( this.category );
    }



    public pushSelectedCategoryStorage( category: ICategory ){

        if(this.selectedCategoryIds){            

            // find level
            debugger;
            let index = this.selectedCategoryIds.findIndex(x => x.Level == category.Level);
            if( index != -1 ){
                // remove
                this.selectedCategoryIds.splice(index, 1);
                
                // add new
                this.selectedCategoryIds.push({
                    Id: category.Id,
                    Title: category.Title,
                    Level: category.Level
                })
             }else{
                // add new
                this.selectedCategoryIds.push({
                    Id: category.Id,
                    Title: category.Title,
                    Level: category.Level
                })
             }

        }else{            
        }
    }


    public isActive( category: ICategory ): boolean {
        debugger;
        let isActive: boolean = false;

        if( !category ) return false;

        if(this.selectedCategoryIds && this.selectedCategoryIds.length > 0){
            if( this.selectedCategoryIds.findIndex( x => x.Id == category.Id && x.Level == category.Level ) != -1 ){
                category.IsActive = true;
                isActive = true;

                //this.categoryList.filter( x => x.Id == category.Id ).shift().IsActive = true;

                let object = this.getObject( this.categoryList, 'Id', category.Id );

            }else{
                category.IsActive = false;                
            }
        }

        return isActive;
    }


    public getObject(array, key, value) {
        var o;
        array.some(function iter(a) {
            if (a[key] === value) {
                o = a;
                return true;
            }
            return Array.isArray(a.Children) && a.Children.some(iter);
        });
        
        return o;
    }

}