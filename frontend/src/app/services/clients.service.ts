import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ClientModel } from '../model/client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  private apiUrl = 'https://car-garage-backend-d7adcbe0ddec.herokuapp.com/api/clients';
  constructor(private http: HttpClient, private router: Router) { }
  async addClient(newClient: {
    firstName: string;
    lastName: string;
    phone: number;
    cars: number[]; 
  }): Promise<void> {
    try {
      const token = localStorage.getItem('token');
const headers = {
  'Authorization': `Bearer ${token}`, 
  'Content-Type': 'application/json'
};
      await firstValueFrom(this.http.post(`${this.apiUrl}/post`, newClient,{ headers }));
    } catch (error) {
      this.router.navigate(['error']);
    }
  }

  async searchByPhone(phone: number): Promise<ClientModel | null> {
    try {
      const token = localStorage.getItem('token');
const headers = {
  'Authorization': `Bearer ${token}`, 
  'Content-Type': 'application/json'
};
      const clients: ClientModel =  await firstValueFrom(this.http.get<any>(`${this.apiUrl}/searchByPhone`, { params: { phone }, headers }));
      return clients;
    } catch (error) {
      console.error('Error searching for clients by phone:', error);
      this.router.navigate(['error']);
      return null; // Return an empty array on error
    }
  }
  async getCarOwners(carNumber: number): Promise<ClientModel[]|null> {
    try {
      const token = localStorage.getItem('token');
const headers = {
  'Authorization': `Bearer ${token}`, 
  'Content-Type': 'application/json'
};
      const owners = await firstValueFrom(this.http.get<ClientModel[]>(`${this.apiUrl}/ownersByCarNumber?carNumber=${carNumber}`,{headers}));
      return owners
    } catch (error) {
      console.error('Error fetching car owners:', error);
      return null
    }
  }
  
  
}
