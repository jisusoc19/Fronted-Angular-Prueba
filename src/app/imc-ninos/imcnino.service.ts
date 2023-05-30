import { Injectable } from '@angular/core';
import {IMCNINOS} from './imc-nino.json';
import { ImcNino } from './imc-nino';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ImcninoService {
  private urlendpoint: string = 'http://localhost:8080/api/imcninos';

  constructor(private http:HttpClient  ) { }
  getimcnino(): Observable<ImcNino[]> {
    // return of(IMCNINOS);
    return this.http.get(this.urlendpoint).pipe(
      map(response => response as ImcNino[])
  );
  }
}
