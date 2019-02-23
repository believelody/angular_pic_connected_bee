import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MesureService {

  constructor(private http: HttpClient) { }

  getMesure(): Observable<any> {
    return this.http
      .get('/.netlify/functions/app/mesures')
      .pipe(map(res => {
        return res['mesures'];
      }));
  }
}
