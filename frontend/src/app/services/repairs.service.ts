import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RepairsService {
  private apiUrl = 'http://localhost:3000/api/clients';
  constructor(private http: HttpClient, private router: Router) { }
  async searchByPhone(phone: number): Promise<any[]> {
    try {
      const clients = await firstValueFrom(this.http.get<any[]>(`${this.apiUrl}/searchByPhone`, { params: { phone } }));
      console.log(clients)
      return clients;
    } catch (error) {
      console.error('Error searching for clients by phone:', error);
      this.router.navigate(['error']);
      return []; // Return an empty array on error
    }
  }

}
