import { Component ,OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { HeaderComponent } from './components/partials/header/header.component';
import { HttpClientModule  } from '@angular/common/http';
import { HttpClient  } from '@angular/common/http';
import { CommonModule } from '@angular/common'; 
import { NgModule } from '@angular/core';
import { io } from 'socket.io-client';

import { FormsModule } from '@angular/forms';  //for input box
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';


const config: SocketIoConfig = { url: 'http://localhost:8988', options: {} };
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent,CommonModule,HttpClientModule,
    FormsModule,RouterLinkActive,RouterLink,RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent{
 

  
}
