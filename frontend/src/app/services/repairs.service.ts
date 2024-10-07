import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { RepairModel } from '../model/repair.model';
import { environment } from '../../environments/environment';
import { BaseService } from './base.service';


@Injectable({
  providedIn: 'root'
})

export class RepairsService extends BaseService {
  
  private apiUrl = environment.apiUrl;
  constructor( http: HttpClient,  router: Router) {super(http,router) }
  async searchByPhone(phone: number): Promise<any[]> {
    try {
      const headers=this.createHeaders()
      const clients = await firstValueFrom(this.http.get<any[]>(`${this.apiUrl}/api/repairs/searchByPhone`, { params: { phone }, headers }));
      return clients;
    } catch (error) {
      this.handleError(error);
      return [];
    }
  }
async postNewRepair(newRepair: RepairModel): Promise<any> {
  try {
    const headers=this.createHeaders()
    const response = await firstValueFrom(this.http.post(this.apiUrl+'/api/repairs', newRepair,{headers}));
    return response;
  } catch (error) {
    this.handleError(error);
    return null;
  }
}
async getUnresolvedRepairs(): Promise<any[]> {
  try {
    const headers=this.createHeaders()
    const unresolvedRepairs = await firstValueFrom(this.http.get<any[]>(this.apiUrl + '/api/repairs/unresolved',{headers}));
    return unresolvedRepairs;
  } catch (error) {
    this.handleError(error);
    return []; 
  }
}
async patchRepair(repairId: string, fixes: string[], cost: number): Promise<any> {
  try {
    const headers=this.createHeaders()
    const response = await firstValueFrom(this.http.patch(`${this.apiUrl}/api/repairs/${repairId}`, { cost, fixes }, {headers}));
    return response;
  } catch (error) {
    this.handleError(error);
    return null;
  }
}
}
