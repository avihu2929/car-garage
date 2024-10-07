// base.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { tokenRemovedEvent } from '../../events';
@Injectable({
  providedIn: 'root'
})
export class BaseService {
  constructor(protected http: HttpClient, protected router: Router) {}

  protected handleError(error: any): void {
    if (error.status === 403) {
      localStorage.removeItem('token');
      tokenRemovedEvent.emit();
      this.router.navigate(['login-page']);
    }
  }
  protected createHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`, 
      'Content-Type': 'application/json'
    });
  }

}
