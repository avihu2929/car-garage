import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { ClientsService } from '../../../services/clients.service';
import { CommonModule } from '@angular/common';
import { RepairsService } from '../../../services/repairs.service';
import { ClientModel } from '../../../model/client.model';
import { CarModel } from '../../../model/car.model';
import { CarsService } from '../../../services/cars.service';
@Component({
  selector: 'app-add-repair-page',
  standalone: true,
  imports: [MatInputModule,MatFormFieldModule,ReactiveFormsModule,MatSelectModule,FormsModule,CommonModule],
  templateUrl: './add-repair-page.component.html',
  styleUrl: './add-repair-page.component.css'
})
export class AddRepairPageComponent {
onCarChange($event: MatSelectChange) {
console.log($event.value)
const carOption = this.cars.at($event.value)
if (carOption) {
  this.setCarDataToUI(carOption);
} else {
  console.log("Selected car not found.");
}
}
carNumber: any;
phoneNumber: number = 666;
lastName: any;
firstName: any;
carCompany: any;
carModel: any;
carCode: any;
cars: CarModel[] = [];
selectedCar: any;

constructor(private clientsService:ClientsService,private carsService:CarsService){}

    async searchByPhone() {
      const client = await this.clientsService.searchByPhone(this.phoneNumber);
      
      // Check if clients is not null or undefined
      if (client) {
        this.setClientDataToUI(client)
        this.selectedCar = 0
        this.cars = [];
        
        // Use map to create an array of promises
        const carPromises = client.cars.map(async carNumber => {
          const car = await this.carsService.searchByNumber(Number(carNumber));
          if (car) { 
            this.cars.push(car); 
          } else {
            console.log(`Car not found for number: ${carNumber}`);
          }
        });
        
        // Wait for all promises to resolve
        await Promise.all(carPromises);
        
        if (this.cars.length > 0) {
          // Uncomment this to set data for the first car
          // this.setCarDataToUI(this.cars[0]); // Set the data for the first car
          const firstCar = this.cars[0];
          this.setCarDataToUI(firstCar);
        } else {
          console.log("No cars found for the client.");
        }
      } else {
        console.log("No clients found.");
      }
    }
    
setCarDataToUI(car: CarModel): void {
   this.carCompany = car.company
   this.carModel = car.model
   this.carNumber = car.number
   this.carCode = car.code
}
setClientDataToUI(client: ClientModel):void{
  this.firstName = client.firstName
  this.lastName = client.lastName
  this.phoneNumber = client.phone
}
}
