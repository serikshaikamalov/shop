import { Component, OnInit, Input, OnChanges } from '@angular/core';

// MODELS
import { IItem } from './../../common/models/item.model';
import { ICategory } from './../../common/models/category.model';

// Services
import { ProductService } from './../../common/_services/product.service';
import { PagerService } from './../../common/_services/pager.service';
import { ShopService } from './../../common/_services/shop.service';


@Component({
    selector: 'items-component',
    templateUrl: './items.component.html',
    styleUrls: ['./items.component.css']    
})
export class ItemsComponent implements OnInit {

    // INPUT
    public categoryId: number = 0;        
    public header: string = 'Верхная одежда';

    // OUTPUT
    public productId: number;

    // DATA
    public itemList: IItem[] = [];
    
    // PAGINATION
    public loading: boolean = false;
    public pager: any = {};
    public pageNumber: number = 1;
    public limit: number = 3;
    public totalCount: number = 0;

    constructor(
        private service: ProductService,
        private pagerService: PagerService,
        private ShopService: ShopService        
    ){}        

    ngOnInit() {
        console.log('Component: Items Component');
        //this.getTotalCount();
        this.setPage( this.pageNumber );
        

        // Listener(Subscriber)
        this.ShopService.change.subscribe(category => {
            this.categoryId = category.Id;  
            this.header = category.Title;  
            this.pageNumber = 1;       
            this.setPage( this.pageNumber );

        });
    }   

    public async loadData(page: number = 1)
    {                  
        this.loading = true;      
        await this.service
                .getAll( page, this.categoryId )                
                .subscribe(data => {                                                                       
                    this.itemList = data;                        
                },
                () =>{}, 
                ()=>{
                    this.loading = false;
                }
                );
    }   


    /**
     * 
     * @param categoryId 
     */
    public async getTotalCount(categoryId: number = 0)
    {                  
        this.loading = true;      
        await this.service
                .getCount( categoryId )                
                .subscribe(response => {  
                    debugger;                                                                     
                    this.totalCount = response;                        
                },
                () =>{}, 
                ()=>{
                    this.loading = false;
                }
                );
    }    


    /**
     *  
     */
    public getItemList( pageNumber: number = 1 ): void {
        this.itemList = [];
        this.loading = true;        
        
        setTimeout(() => {
            this.loading = false;
            
            this.itemList.push(
                {
                    Id: 1,
                    Title: 'Куртка',
                    Price: 9000
                },
                {
                    Id: 2,
                    Title: 'Плащ',
                    Price: 12000
                },
                {
                    Id: 3,
                    Title: 'Пальто',
                    Price: 20000
                },
            );
            
        }, 1000)        
    }


    public async setPage(page: number) {
        this.pageNumber = page;
        

        this.loading = true;
        await this.service
                .getCount( this.categoryId )                
                .subscribe(response => {  
                    debugger;                                                                     
                    this.totalCount = response;     
                    if (this.pageNumber < 1 || this.pageNumber > this.totalCount) { return; }

                    // get pager object from service
                    this.pager = this.pagerService.getPager(this.totalCount, 
                                                            this.pageNumber,
                                                            this.limit);         

                    // get current page of items        
                    this.loadData(this.pageNumber); 
                },
                () =>{}, 
                ()=>{
                    this.loading = false;
                }
                );        
    }


    /**
     * Trigger
     * @param productId 
     */
    public selectProduct( productId: number ){
        this.productId = productId;
        this.ShopService.sendProduct( this.productId );
    }


    public addNew(){
        this.productId = 0;
        let mode: number = 1;        
        this.ShopService.sendMode( mode );
    }


    public checkProduct( productId: number ){
        this.productId = productId;
    }


    public delete(){
        this.loading = true;
        if(confirm("Are you sure to delete item?")) {
            console.log('Selected: Yes');
            this.service.delete( this.productId ).subscribe(
                ( response )=>{
                    
                },
                ()=>{},
                ()=>{
                    this.loading = false;
                    this.setPage(1);
                },
            );

        }else{
            console.log('Selected: NO');
        }
    }

    public onCheckChange(event){
        debugger;
        /* Selected */
        if(event.target.checked){
            // Add a new control in the arrayForm
            console.log('Ckeced');

            let value = event.target.value;
        }

    }
}