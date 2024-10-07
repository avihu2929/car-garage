import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { CarModel } from '../model/car.model';
import { environment } from '../../environments/environment';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class CarsService extends BaseService {
  private apiUrl =environment.apiUrl;
  constructor( http: HttpClient,  router: Router) {super(http,router) }

  async addCar(newCar: { number: number; company: string; model: string; code?: number }): Promise<void> {
    try {
      const headers=this.createHeaders()
      await firstValueFrom(this.http.post(`${this.apiUrl}/api/cars/post`, newCar, { headers }));
    } catch (error) {
      this.handleError(error);
    }
  }
  async searchByNumber(number: number): Promise<CarModel|null> {
    try {
      const headers=this.createHeaders()
      const cars = await firstValueFrom(this.http.get<CarModel>(`${this.apiUrl}/api/cars/searchByNumber?number=${number}`, { headers }));
      return cars;
    } catch (error) {
      this.handleError(error);
      return null
    }
  }
  async searchByClientPhone(phone: number): Promise<CarModel[]|null> {
    try {
      const headers=this.createHeaders()
      const cars = await firstValueFrom(this.http.get<CarModel[]>(`${this.apiUrl}/api/cars/byClientPhone?phone=${phone}`,{headers}));
      return cars; // Return the list of cars
    } catch (error) {
      this.handleError(error);
      return null
    }
  }
  }

