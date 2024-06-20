import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProduitService {
  private apiUrl = 'http://localhost:8080/api/v1/produits'; // Endpoint Spring

  constructor(private http: HttpClient) {}

  getProduits(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getProduit(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  addProduit(produit: any): Observable<any> {
    console.log(produit);
    return this.http.post(this.apiUrl + '/' + produit?.fournisseurId, produit);
  }

  updateProduit(id: number, produit: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, produit);
  }

  deleteProduit(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
