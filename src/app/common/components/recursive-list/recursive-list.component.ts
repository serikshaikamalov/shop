import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';

// Models
import { ICategory } from './../../models/category.model';

// SERVICES
import { ShopService } from './../../_services/shop.service';

@Component({
    selector: 'recursive-list',
    templateUrl: './recursive-list.component.html'    
})
export class RecursiveListComponent implements OnInit, OnChanges {
    
    @Input() item: any;
    @Input() level: number = 1;    

    public offsetLeft: number = 20;
    public categoryId: number;
    public selectedCategoryIds: ICategory[] = [];
    public category: ICategory;

    constructor(
        private shopService: ShopService
    ){}        

    ngOnInit() {
        console.log('Component: RecursiveList Component');
        

        
    }   

    public ngOnChanges(){}

    public changeCategory( category: ICategory ){
        console.log('Category: ', category);        
        if( !category ){ return false; }

        this.categoryId = category.Id;
        this.category = category;

        // Send to Subscriber
        this.shopService.toggle(this.category);
    }


    public isActive( category: ICategory ): boolean {
        debugger;
        let isActive: boolean = false;

        if( !category ) return false;

        if(this.selectedCategoryIds && this.selectedCategoryIds.length > 0){
            if( this.selectedCategoryIds.findIndex( x => x.Id == category.Id && x.Level == category.Level ) != -1 ){
                category.IsActive = true;
                isActive = true;
            }else{
                category.IsActive = false;                
            }
        }

        return isActive;
    }

}