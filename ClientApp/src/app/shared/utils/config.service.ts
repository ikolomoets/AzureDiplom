import { Injectable } from '@angular/core';
 
@Injectable()
export class ConfigService {
     
    _apiURI : string;
 
    constructor() {
        this._apiURI = 'https://diplom20200410104007.azurewebsites.net//api';
     }
 
     getApiURI() {
         return this._apiURI;
     }    
}
 