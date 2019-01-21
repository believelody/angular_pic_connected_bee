import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TestService {
    constructor(private httpClient: HttpClient) { }
    
    getTest() {
        return this.httpClient.get('http://localhost:9000/.netlify/functions/test');
    }
}