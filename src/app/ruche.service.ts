import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RucheService {
  id: string;
  constructor(private http: HttpClient) { }

  getRuches(): Observable<any> {
    // Demande au serveur toutes les ruches enregistrées dans la base de données
    return this.http
      .get('/.netlify/functions/app/ruches')
      .pipe(map(ruches => ruches));
  }

  setRuche(id: string) {
    this.id = id;
  }

  getRuche() {
    return this.id;
  }
}
