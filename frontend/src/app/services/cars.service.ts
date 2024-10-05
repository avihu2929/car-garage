import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { CarModel } from '../model/car.model';

@Injectable({
  providedIn: 'root'
})
export class CarsService {
  private apiUrl = 'http://localhost:3000/api/cars';
  constructor(private http: HttpClient, private router: Router) { }
  async addCar(newCar: { number: number; company: string; model: string; code?: number }): Promise<void> {
    try {
      await firstValueFrom(this.http.post(`${this.apiUrl}/post`, newCar));
    } catch (error) {
      this.router.navigate(['error']);
    }
  }
  async searchByNumber(number: number): Promise<CarModel|null> {
    try {
      const cars = await firstValueFrom(this.http.get<CarModel>(`${this.apiUrl}/searchByNumber?number=${number}`));
      return cars; // Return the list of cars
    } catch (error) {
      console.error('Error searching for cars:', error);
    return null
    }
  }
  async searchByClientPhone(phone: number): Promise<CarModel[]|null> {
    try {
      const cars = await firstValueFrom(this.http.get<CarModel[]>(`${this.apiUrl}/byClientPhone?phone=${phone}`));
      return cars; // Return the list of cars
    } catch (error) {
      console.error('Error searching for cars:', error);
    return null
    }
  }
  }

