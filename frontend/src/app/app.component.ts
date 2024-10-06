import { Component ,OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { HeaderComponent } from './components/partials/header/header.component';
import { HttpClientModule  } from '@angular/common/http';
import { HttpClient  } from '@angular/common/http';
import { CommonModule } from '@angular/common'; 
import { NgModule } from '@angular/core';
import { io } from 'socket.io-client';
import { FormsModule } from '@angular/forms';  //for input box

interface User {
  _id?: string; // Optional for newly created users
  name: string;
  age: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent,CommonModule,HttpClientModule,
    FormsModule,RouterLinkActive,RouterLink,RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent{

  // getUsers(): void {
  //   //correct
  //   this.http.get<User[]>('http://localhost:3000/api/users').subscribe({
  //     next: (data) => {
  //       this.users = data; // Update the users array with the fetched data
  //       console.log(data)
  //     },
  //     error: (error) => {
  //       console.error('Error fetching users:', error); // Handle error
  //     }
  //   }
  //   );
  // }
  // deleteUser(i: any): void {
  //   this.http.delete(`${'http://localhost:3000/api/users'}/${this.users[i]._id}`).subscribe(
  //     (response: any) => {
  //       console.log('User deleted:', response);
  //       // Optionally remove the user from the local users array
  //       this.users = this.users.filter(user => user._id !== this.users[i]._id);
  //     },
  //     (error) => {
  //       console.error('Error deleting user:', error);
  //     }
  //   );
  // }
  
  // updateUser(i: any): void {
  //   const updatedData = {
  //     name: this.users[i].name, // Get the updated name from the user object
  //     age: this.users[i].age      // Get the updated age from the user object
  //   };
  //   this.http.put(`${'http://localhost:3000/api/users'}/${this.users[i]._id}`, updatedData).subscribe(
  //     (response: any) => {
  //       console.log('User updated:', response);
  //       this.getUsers()
  //       // Update the user list with the updated data, or refetch the data
  //     },
  //     (error) => {
  //       console.error('Error updating user:', error);
  //     }
  //   );
  // }

  // getUserByName(name: string): void {
  //   this.http.get<User>(`http://localhost:3000/api/users/${name}`).subscribe(
  //     (data) => {
  //       this.users.push(data) // Store the fetched user
  //     },
  //     (error) => {
  //       console.error('Error fetching user:', error);
  //     }
  //   );
  // }
  // // Method to add a new user and post it to the backend
  // addUser(): void {
  //   if (this.newUserName.trim()) {
  //     const newUser = {
  //       name: this.newUserName,
  //       age: this.newUserAge
  //     };

  //     // Send POST request to the backend
  //     this.http.post('http://localhost:3000/api/users/post', newUser).subscribe(
  //       (response: any) => {
  //         console.log('User added:', response);
  //         this.getUsers()
  //       //  this.users.push(response);  // Add the new user to the list
  //         this.newUserName = ''; // Clear the input field
  //         this.newUserAge = '';
  //       },
  //       (error) => {
  //         console.error('Error adding user:', error);
  //       }
  //     );
  //   }
  // }
}
