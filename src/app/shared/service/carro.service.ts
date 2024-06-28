import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CarroService {
  constructor(private http: HttpClient) {}

  adicionarCarro(data: any): Observable<any> {
    return this.http.post(`${environment.api}/cars`, data);
  }

  getListaCarro(): Observable<any> {
    return this.http.get(`${environment.api}/cars`);
  }

  atualizarCarro(id: number, data: any): Observable<any> {
    return this.http.put(`${environment.api}/cars/${id}`, data);
  }

  
  deletarCarro(id: number): Observable<any> {
    return this.http.delete(`${environment.api}/cars/${id}`);
  }
}
