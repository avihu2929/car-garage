import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ClientModel } from '../model/client.model';
import { environment } from '../../environments/environment';
import { BaseService } from './base.service';
@Injectable({
  providedIn: 'root'
})
export class ClientsService extends BaseService {

  private apiUrl = environment.apiUrl;
  constructor( http: HttpClient,  router: Router) {super(http,router) }
    async addClient(newClient: {
    firstName: string;
    lastName: string;
    phone: number;
    cars: number[]; 
  }): Promise<void> {
    try {
      const headers=this.createHeaders()
      await firstValueFrom(this.http.post(`${this.apiUrl}/api/clients/post`, newClient,{ headers }));
    } catch (error) {
      this.handleError(error);
    }
  }
  async searchByPhone(phone: number): Promise<ClientModel | null> {
    try {
      const headers=this.createHeaders()
      const clients: ClientModel =  await firstValueFrom(this.http.get<any>(`${this.apiUrl}/api/clients/searchByPhone`, { params: { phone }, headers }));
      return clients;
    } catch (error) {
      this.handleError(error);
      return null;
    }
  }
  async getCarOwners(carNumber: number): Promise<ClientModel[]|null> {
    try {
      const headers=this.createHeaders()
      const owners = await firstValueFrom(this.http.get<ClientModel[]>(`${this.apiUrl}/api/clients/ownersByCarNumber?carNumber=${carNumber}`,{headers}));
      return owners
    } catch (error) {
      this.handleError(error);
      return null;
    }
  }
}
