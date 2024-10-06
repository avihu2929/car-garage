import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { RepairModel } from '../model/repair.model';

@Injectable({
  providedIn: 'root'
})

export class RepairsService {
  
  private apiUrl = 'https://car-garage-backend-d7adcbe0ddec.herokuapp.com/api/repairs';
  constructor(private http: HttpClient, private router: Router) { }
  async searchByPhone(phone: number): Promise<any[]> {
    try {
      const token = localStorage.getItem('token');
const headers = {
  'Authorization': `Bearer ${token}`, 
  'Content-Type': 'application/json'
};
      const clients = await firstValueFrom(this.http.get<any[]>(`${this.apiUrl}/searchByPhone`, { params: { phone }, headers }));
      console.log(clients)
      return clients;
    } catch (error) {
      console.error('Error searching for clients by phone:', error);
      this.router.navigate(['error']);
      return []; // Return an empty array on error
    }
  }
async postNewRepair(newRepair: RepairModel): Promise<any> {
  try {
    const token = localStorage.getItem('token');
const headers = {
  'Authorization': `Bearer ${token}`, 
  'Content-Type': 'application/json'
};
    console.log('Posting new repair:', newRepair);
    const response = await firstValueFrom(this.http.post(this.apiUrl, newRepair,{headers}));
    console.log('New repair posted:', response);
    return response;
  } catch (error) {
    console.error('Error posting repair:', error);
    return null;
  }
}
async getUnresolvedRepairs(): Promise<any[]> {
  try {
    const token = localStorage.getItem('token');
    const headers = {
      'Authorization': `Bearer ${token}`, 
      'Content-Type': 'application/json'
    };
    const unresolvedRepairs = await firstValueFrom(this.http.get<any[]>(this.apiUrl + '/unresolved',{headers}));
   console.log(unresolvedRepairs)
    return unresolvedRepairs;
  } catch (error) {
    console.error('Error retrieving unresolved repairs:', error);
    this.router.navigate(['error']);
    return []; // Return an empty array on error
  }
}
}
