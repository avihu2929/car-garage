import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ClientModel } from '../model/client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  private apiUrl = 'http://localhost:3000/api/clients';
  constructor(private http: HttpClient, private router: Router) { }
  async addClient(newClient: {
    firstName: string;
    lastName: string;
    phone: number;
    cars: number[]; 
  }): Promise<void> {
    try {
      await firstValueFrom(this.http.post(`${this.apiUrl}/post`, newClient));
    } catch (error) {
      this.router.navigate(['error']);
    }
  }

  async searchByPhone(phone: number): Promise<ClientModel | null> {
    try {
      const clients: ClientModel =  await firstValueFrom(this.http.get<any>(`${this.apiUrl}/searchByPhone`, { params: { phone } }));
      console.log(clients)
      return clients;
    } catch (error) {
      console.error('Error searching for clients by phone:', error);
      this.router.navigate(['error']);
      return null; // Return an empty array on error
    }
  }

  
}
