import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'shop-component',
    templateUrl: './shop.component.html',
    styleUrls: ['./shop.component.css']    
})
export class ShopComponent implements OnInit {
    
    public categoryId: number;

    constructor(
    ){}        

    ngOnInit() {
        console.log('Component: Shop Component');
    }           
}