import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { API_URL } from '../../constants'
import 'rxjs/add/operator/map';

// Models
import { IItem } from './../models/item.model'

@Injectable()
export class ProductService {    
    
    constructor(private http: Http) { }

    extractData(response: Response){
        return response.json();
    }

    /**
     * @return Category[]
     */
    public getAll( pageNumber: number = 1, categoryId: number = 0 ): Observable<any> {        

        return this.http.get( API_URL + '/api/products/list/' 
                                      + '?pageNumber='+ pageNumber
                                      + '&categoryId='+ categoryId
                                       ).map((response: Response) => response.json());
    }    

    /**
     * Get Product by Id
     */
    public getOne( productId: number ){
        return this.http.get( API_URL + '/api/products/details/'                                       
                                      + '?productId='+ productId
                                       ).map((response: Response) => response.json());
    }


    public create( product: IItem ){
        return this.http.post( API_URL + '/api/products/create/',{
            Title: product.Title,
            Price: product.Price,
            Count: product.Count,
            CategoryId: product.CategoryId,
            StatusId: product.StatusId
        }).map((response: Response) => response.json());
    }


    /**
     * API: Edit
     * @param productId
     * @param product 
     */
    public edit( productId: number, product: IItem ){       
        debugger;         
        
        return this.http.post( API_URL + '/api/products/edit/?productId='+ productId,
        {        
            Title: product.Title,
            Count: product.Count,
            Price: product.Price            
        }
        ).map((response: Response) => response.json());
    }

    public delete( productId: number ){                       
        
        return this.http.post( API_URL + '/api/products/delete/?productId=' + productId,
        {}
        ).map((response: Response) => response.json());
    }


    /**
     * 
     * @param categoryId 
     */
    public getCount( categoryId: number = 0 ): Observable<number> {   
        debugger     

        return this.http.get( API_URL + '/api/products/count'                                       
                                      + '?categoryId='+ categoryId
                                       ).map((response: Response) => response.json());
    }



}