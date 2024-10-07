import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ClientsService } from '../../../services/clients.service';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-add-client-page',
  standalone: true,
  imports: [MatButtonModule,MatInputModule,MatFormFieldModule,ReactiveFormsModule,MatSelectModule,FormsModule,CommonModule],
  templateUrl: './add-client-page.component.html',
  styleUrl: './add-client-page.component.css'
})
export class AddClientPageComponent {
firstName: any;
lastName: any;
phoneNumber: any;
carNumber: any;
cars:number[]=[];
constructor(private clientsService: ClientsService) {} 

addCarNumber(): void {
  if (this.carNumber) { // Check if carNumber is not null or undefined
    this.cars.push(this.carNumber); // Add carNumber to the cars array
    this.carNumber = null; // Optionally reset carNumber after adding
  } else {
    console.error('Car number is null or undefined.'); // Handle the case when carNumber is null
  }
}
async addClient(): Promise<void> {
  const newClient = {
    firstName: this.firstName,
    lastName: this.lastName,   
    phone: this.phoneNumber,
    cars: this.cars
  };
   await this.clientsService.addClient(newClient)
 // console.log(newClient)

}
}
