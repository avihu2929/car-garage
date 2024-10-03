import { Component ,OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {HomeComponent} from './home/home.component';
import { HeaderComponent } from './components/partials/header/header.component';
import { CommonModule } from '@angular/common'; 
import { NgModule } from '@angular/core';
import { io } from 'socket.io-client';
import { FormsModule } from '@angular/forms';  //for input box
import { MenuComponent } from './components/menu/menu.component';

import { UnsolvedRepairsPageComponent } from './components/pages/unsolved-repairs-page/unsolved-repairs-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent,CommonModule,
    FormsModule, MenuComponent,RouterLinkActive,RouterLink,RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
newUserName: any;
newUserAge: any;
updatedUserName: any;
greet(name: string) {
  console.log('Hello there '+name+ ' 👋');

}
  title = 'frontend';
  users: any[] = []; // Your users array
  constructor() {}
  ngOnInit() {
}

}
