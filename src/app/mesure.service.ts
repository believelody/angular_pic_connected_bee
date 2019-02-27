import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MesureService {
  mesures: any[] = [];

  constructor(private http: HttpClient) { }

  getMesureRequest(id: string): Observable<any> {
    return this.http
      .get(`/.netlify/functions/app/mesures?ruche=${id}`)
      .pipe(map(res => res['mesures']));
  }

  selectDate(date: Date, mesures: any[]): any[] {
    
    return mesures
      .filter(mesure => {
        let d = new Date(date);
        let m = new Date(mesure.updatedAt);
        if (m.getMonth() === d.getMonth()) {
          if (m.getDate() === d.getDate()) {
            return mesure;
          }
          else return mesure;
        }
      })
      .map(mesure => mesure);
  }

  getMesure() {
    return this.mesures;
  }
}
