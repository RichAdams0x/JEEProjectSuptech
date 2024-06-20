import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommandeService {
  private apiUrl = 'http://localhost:8080/api/v1/commandes'; // Endpoint Spring

  constructor(private http: HttpClient) {}

  getCommandes(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  addCommande(commande: any): Observable<any> {
    return this.http.post(this.apiUrl + '/' + commande?.client?.id, commande);
  }

  deleteCommande(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  addLigneCommande(ligneCommande: any): Observable<any> {
    console.log(ligneCommande);

    return this.http.post(
      `http://localhost:8080/api/v1/ligne-commandes`,
      ligneCommande
    );
  }
}
