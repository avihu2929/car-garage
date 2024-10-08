import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Observable } from 'rxjs';
import { UsersService } from '../../../services/users.service';
import { genSalt, hash } from "bcrypt-ts";
import { compareSync } from "bcrypt-ts";
import { compare } from 'bcrypt-ts';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [MatButtonModule,MatInputModule,CommonModule,FormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  private _snackBar = inject(MatSnackBar);

  constructor(private usersService:UsersService) {}
  http: any;
  hash1: any;
  hash2: any;
async login(phone: string, password: string){
  
  try{
    await this.usersService.login(phone,password)
  }catch (err){
    this._snackBar.open("Phone or password are incorrect", "close");
  }

}

}
  // genSalt(10)
  // .then((salt) => hash("hello", salt))
  // .then((hash) => {
  //   this.hash1=hash;
  // });
  // genSalt(10)
  // .then((salt) => hash("hello", salt))
  // .then((hash) => {
  //   this.hash2=hash;
  // });
