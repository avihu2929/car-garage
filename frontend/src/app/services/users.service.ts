import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, firstValueFrom, map, Observable, of, tap } from 'rxjs';
import { UserModel } from '../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {

  constructor(private http: HttpClient, private router: Router) { }

  
  // getUsers(): Observable<UserModel[]> {
  //   return this.http.get<UserModel[]>('http://localhost:3000/api/users')
  //   .pipe(tap({error: ()=> this.router.navigate(["error"])}));
  // }
  
  getUsers(): Observable<any> {
    return this.http.get(`'https://localhost:3000/api/users`);
  }

  async login(hash: string): Promise<void> {
    try {
      const response = await firstValueFrom(this.http.post('https://localhost:3000/api/auth/login', hash));
      console.log('New repair posted:', response);
    } catch (error) {
      console.error('Error posting repair:', error);
    }
  }
async getUsers2(): Promise<UserModel[]> {
  try {
    const users = await firstValueFrom(this.http.get<UserModel[]>('https://localhost:3000/api/users'));
    return users || []; // Return an empty array if users is undefined
  } catch (error) {
    this.router.navigate(["error"]);
    return []; // Handle error and return empty array
  }
}


  deleteUser(id: string): Observable<boolean> {
    return this.http.delete(`${'https://localhost:3000/api/users'}/${id}`).pipe(
      map(()=> {
        return true;
      }),
      catchError(() => of(false)));
  }
  
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
