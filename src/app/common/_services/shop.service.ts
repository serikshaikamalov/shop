import { Injectable, Output, EventEmitter } from '@angular/core'

// Models
import { ICategory } from './../models/category.model'

export class ShopService {    
    public category: ICategory;

    // EVENTS
    @Output() change: EventEmitter<ICategory> = new EventEmitter();
    @Output() productListener: EventEmitter<number> = new EventEmitter();
    @Output() modeListener: EventEmitter<number> = new EventEmitter();


    // TRIGGER
    public toggle( category: ICategory ) {
        if(!category){ return false;}

        this.category = category;
    
        this.change.emit(this.category);
    }

    public sendProduct( productId: number ){
        this.productListener.emit( productId );
    }

    public sendMode( modeId: number ){
        this.modeListener.emit( modeId );
    }
}