import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { API_URL } from '../../constants'
import 'rxjs/add/operator/map';


@Injectable()
export class CategoryService {    
    
    constructor(private http: Http) { }

    extractData(response: Response){
        return response.json();
    }

    /**
     * @return Category[]
     */
    public getAll(): Observable<any> {        

        return this.http.get( API_URL + '/api/categories/list/').map((response: Response) => response.json());
    }    
}