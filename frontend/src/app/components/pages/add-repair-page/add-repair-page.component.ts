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


carNumber: any;
phoneNumber: number = 666;
lastName: any;
firstName: any;
carCompany: any;
carModel: any;
carCode: any;
cars: CarModel[] = [];
selectedCar: any;
clients: ClientModel[] =[];
selectedClient: any;

constructor(private clientsService:ClientsService,private carsService:CarsService){}
onCarChange($event: MatSelectChange) {
  const carOption = this.cars.at($event.value)
  if (carOption) {
    this.setCarDataToUI(carOption);
  } else {
    console.log("Selected car not found.");
  }
  }
  onClientChange($event: MatSelectChange) {
    const clientOption = this.clients.at($event.value)
    if (clientOption) {
      this.setClientDataToUI(clientOption);
    } else {
      console.log("Selected car not found.");
    }
    }
  async searchByPhone(){
    const client = await this.clientsService.searchByPhone(this.phoneNumber);
    if(client){
      const cars = await this.carsService.searchByClientPhone(client.phone)
      this.setClientDataToUI(client)
      this.clients=[]
      this.cars=[]
      if (cars && cars.length > 0) {
        cars.forEach(car=>{
          this.cars.push(car)
        })
        const firstCar = cars[0]; 
        this.selectedCar = 0
        this.setCarDataToUI(firstCar);
      }
    }
  }
    async searchByCarNum() {
      const car = await this.carsService.searchByNumber(this.carNumber);
      if (car) {
        this.setCarDataToUI(car)
        const clients = await this.clientsService.getCarOwners(car.number); 
        this.clients=[]
        this.cars=[]
        if(clients && clients.length>0){
          clients.forEach(client=>{
            this.clients.push(client)
          })
          const firstClient = clients[0]; 
          this.selectedClient = 0;
          this.setClientDataToUI(firstClient);
        }
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
