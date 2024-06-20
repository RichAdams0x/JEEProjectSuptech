import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FournisseurService {
  private apiUrl = 'http://localhost:8080/api/v1/fournisseurs'; // Endpoint Spring

  constructor(private http: HttpClient) {}

  getFournisseurs(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getFournisseur(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  addFournisseur(fournisseur: any): Observable<any> {
    return this.http.post(this.apiUrl, fournisseur);
  }

  updateFournisseur(id: number, fournisseur: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, fournisseur);
  }

  deleteFournisseur(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
