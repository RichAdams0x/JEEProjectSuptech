import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private apiUrl = 'http://localhost:8080/api/v1/clients'; // Endpoint Spring

  constructor(private http: HttpClient) {}

  getClients(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  addClient(client: any): Observable<any> {
    return this.http.post(this.apiUrl, client);
  }

  updateClient(id: number, client: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, client);
  }

  deleteClient(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
