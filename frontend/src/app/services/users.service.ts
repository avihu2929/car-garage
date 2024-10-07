import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, firstValueFrom, map, Observable, of, tap } from 'rxjs';
import { UserModel } from '../model/user.model';
import { environment } from '../../environments/environment';
import { tokenAddedEvent } from '../../events';
import { BaseService } from './base.service';
interface LoginResponse {
  message: string;
  token: string; // or { accessToken: string } if the token is nested
}

@Injectable({
  providedIn: 'root',
})
export class UsersService extends BaseService{

  constructor(http: HttpClient, router: Router) {
    super(http, router); 
    }
  private apiUrl = environment.apiUrl;

  async login(phone:string ,password: string): Promise<void> {
    try {
      const response: LoginResponse = await firstValueFrom(this.http.post<LoginResponse>(`${this.apiUrl}/api/auth/login`, { phone, password }));
      const token = response.token;
      localStorage.setItem('token', token);
      tokenAddedEvent.emit();
      this.router.navigate(['']);
    } catch (error) {
      console.error('Error posting repair:', error);
    }
  }
}