import { Component, OnInit } from '@angular/core';

// Models
import { IItem } from './../../common/models/item.model';
import { Form } from './../../common/models/form.model';

// Services
import { ProductService } from './../../common/_services/product.service';
import { ShopService } from './../../common/_services/shop.service';


// FORM
import { FormGroup, FormControl, Validators } from '@angular/forms';

enum mode {
    isNew = 1,
    edit = 2,
    view = 3    
};

@Component({
    selector: 'details-component',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.css']    
})

export class DetailsComponent implements OnInit {
    
    public header: string = 'Новый товар';
    public loading: boolean = false;
    public mode: number = mode.isNew;    

    // INPUT
    public productId: number;
    public product: IItem;

    // Form    
    public myform: FormGroup;    
    public Title: FormControl;
    public Price: FormControl;
    public Count: FormControl;

    constructor(
        private service: ProductService,
        private shopService: ShopService
    ){}        

    ngOnInit() {
        console.log('Component: Details Component');

        this.initProduct();    

        this.createFormControls();
        this.createForm();

       
        // Product Subscriber
        this.shopService.productListener.subscribe(            
            ( productId: number ) => {                
                debugger;
                switch( this.mode ){                    
                    case mode.isNew:                              
                    case mode.view:                                      
                        this.loadProduct( productId );                      
                        break;
                    case mode.edit:
                        alert('Save or Cancel Product!');    
                        break;                    
                }                                                   
            }                
        );   


        // Mode Subscriber
        this.shopService.modeListener.subscribe(            
            ( modeId: number ) => {               
                 debugger;
                switch( this.mode ){                    
                    case mode.isNew:   
                        
                            let oldFormData = {
                                Title: this.product.Title,
                                Price: this.product.Price,
                                Count: this.product.Count
                            };


                            if( this.myform.value.Title == oldFormData.Title &&
                                this.myform.value.Price == oldFormData.Price &&
                                this.myform.value.Count == oldFormData.Count
                                ){
                                this.mode = mode.view;                    
                            }else{
                                this.mode = mode.isNew;
                                alert('Save or Cancel Product!');    
                            }       

                        break;
                    case mode.view:                                      
                        this.mode = 1;
                        this.productId = 0
                        this.initProduct();  
                        this.formAddValue(this.product);

                        break;
                    case mode.edit :
                        alert('Save or Cancel Product!');    
                        break;                    
                }
            }
        );


        // Form Subscriber                
        this.myform.valueChanges.subscribe(
            ( response )=>{
                debugger;

                if( this.productId > 0 ){

                    let oldFormData = {
                        Title: this.product.Title,
                        Price: this.product.Price,
                        Count: this.product.Count
                    };


                    if( this.myform.value.Title == oldFormData.Title &&
                        this.myform.value.Price == oldFormData.Price &&
                        this.myform.value.Count == oldFormData.Count
                        ){
                        this.mode = mode.view;                    
                    }else{
                        this.mode = mode.edit;
                    }                                    
                }else{
                    this.mode = mode.isNew;
                }

                // if( this.mode == mode.create )
                // {
                //     let oldFormData = {
                //         Title: this.product.Title,
                //         Price: this.product.Price,
                //         Count: this.product.Count
                //     };


                //     if( this.myform.value.Title == oldFormData.Title &&
                //         this.myform.value.Price == oldFormData.Price &&
                //         this.myform.value.Count == oldFormData.Count
                //         ){
                //         this.mode = mode.create;                    
                //     }else{
                //         this.mode = mode.edit;
                //     }
                // }
                
                
            }
        );        


        // Image Subscriber
        this.shopService.imageListener.subscribe(            
            ( imageId: number ) => {           
                debugger;     
                this.product.ImageId = imageId;                                                  
            }                
        );  
        
    }   

    public createFormControls(){
        this.Title = new FormControl(this.product.Title, [
                            Validators.required,
                            Validators.minLength(5)
                            ]);


        this.Price = new FormControl(this.product.Price, [ 
            Validators.required,
            Validators.min(100),
            Validators.max(10000000),            
        ]);

        this.Count = new FormControl(this.product.Count,[
            Validators.required,
            Validators.min(1),
            Validators.max(1000),  
        ]);
    }


    public createForm(){
        this.myform = new FormGroup({
            Title: this.Title,
            Price: this.Price,
            Count: this.Count
        })
    }


    /**
     * Get Prodcut by Id
     * @param productId 
     */    
    public async loadProduct(productId: number)
    {                          
        this.loading = true;      
        this.productId = productId;
        //this.mode = mode.view;

        await this.service
                .getOne( this.productId )                
                .subscribe(product => {    
                    debugger;                                                                   
                    this.product = product;     

                    this.myform.setValue({ 
                        Title: product.Title,
                        Price: product.Price,
                        Count: product.Count
                     });                   
                },
                () =>{}, 
                ()=>{
                    this.loading = false;
                }
                );
    }  



    public initProduct(){
        this.product = {
            Title: '',
            Count: 0,
            Price: 0
        };
    }


    public formAddValue( product: IItem ){
        this.myform.setValue({ 
            Title: product.Title,
            Price: product.Price,
            Count: product.Count
        });
    }


    /**
     * Actions: Save
     */
    public async save()
    {                               
        debugger;
        this.loading = true;              

        // Determine mode        

        if( this.mode == mode.isNew ){
            
            let product:IItem = {
                Title: this.myform.controls['Title'].value,
                Price: this.myform.controls['Price'].value,
                Count: this.myform.controls['Count'].value,
                CategoryId: 1,
                StatusId: 1,
                ImageId: this.product.ImageId
            }

            await this.service
                .create( product )                
                .subscribe(
                    () => {},
                    () =>{}, 
                    ()=>{
                        this.loading = false;
                    }
                );
        }else if( mode.edit){
            debugger;

            let product:IItem = {
                Title: this.myform.controls['Title'].value,
                Price: this.myform.controls['Price'].value,
                Count: this.myform.controls['Count'].value,
                CategoryId: 1,
                StatusId: 1,
            }

             await this.service
                .edit( this.productId, product )                
                .subscribe(
                    () => {},
                    () =>{}, 
                    ()=>{
                        this.loading = false;
                        this.mode = mode.isNew;

                        // Reset
                        this.initProduct();
                        this.formAddValue(this.product);
                    }
                );
        }

        
    }

    /**
     * Actions: cancel
     */
    public cancel(){
        debugger;
        this.myform.reset({
            Title: this.product.Title,
            Price: this.product.Price,
            Count: this.product.Count,            
        })
    } 


    public isFormValid(): boolean{
        return (this.myform.status == 'VALID') ? true : false;        
    }

    public getHeader(){
        switch(this.mode ){
            default:
            case mode.isNew:
                this.header = 'Новый товар';
                break;
            case mode.edit:
                this.header = 'Редактирование товара';
                break;
            case mode.view:
                this.header = 'Просмотр товара';
                break;
        }
    }
}