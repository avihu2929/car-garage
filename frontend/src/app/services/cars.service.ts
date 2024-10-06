import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { CarModel } from '../model/car.model';

@Injectable({
  providedIn: 'root'
})
export class CarsService {
  private apiUrl = 'https://car-garage-backend-d7adcbe0ddec.herokuapp.com/api/cars';
  constructor(private http: HttpClient, private router: Router) { }
  async addCar(newCar: { number: number; company: string; model: string; code?: number }): Promise<void> {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        'Authorization': `Bearer ${token}`, 
        'Content-Type': 'application/json'
      };
      await firstValueFrom(this.http.post(`${this.apiUrl}/post`, newCar, { headers }));
    } catch (error) {
      this.router.navigate(['error']);
    }
  }
  async searchByNumber(number: number): Promise<CarModel|null> {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        'Authorization': `Bearer ${token}`, 
        'Content-Type': 'application/json'
      };
      const cars = await firstValueFrom(this.http.get<CarModel>(`${this.apiUrl}/searchByNumber?number=${number}`, { headers }));
      return cars; // Return the list of cars
    } catch (error) {
      console.error('Error searching for cars:', error);
    return null
    }
  }
  async searchByClientPhone(phone: number): Promise<CarModel[]|null> {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        'Authorization': `Bearer ${token}`, 
        'Content-Type': 'application/json'
      };
      const cars = await firstValueFrom(this.http.get<CarModel[]>(`${this.apiUrl}/byClientPhone?phone=${phone}`,{headers}));
      return cars; // Return the list of cars
    } catch (error) {
      console.error('Error searching for cars:', error);
    return null
    }
  }
  }

