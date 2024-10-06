import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import { ClientsService } from '../../../services/clients.service';
import { CommonModule } from '@angular/common';
import { RepairsService } from '../../../services/repairs.service';
import { ClientModel } from '../../../model/client.model';
import { CarModel } from '../../../model/car.model';
import { CarsService } from '../../../services/cars.service';
import { RepairModel } from '../../../model/repair.model';
import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-add-repair-page',
  standalone: true,
  imports: [MatButtonModule,MatInputModule,MatFormFieldModule,ReactiveFormsModule,MatSelectModule,FormsModule,CommonModule],
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
showClientsSelect: any = false;
showCarsSelect: any = false; 
repairIssue: any;
private _snackBar = inject(MatSnackBar);
constructor(private clientsService:ClientsService,private carsService:CarsService, private repairsService:RepairsService){}

async addRepair() {
  try {
    const newRepair: RepairModel = {
      carCompany: this.carCompany,
      carModel: this.carModel,
      carNumber: this.carNumber,
      carCode: this.carCode,
      firstName: this.firstName,
      lastName: this.lastName,
      clientPhone: this.phoneNumber,
      resolved: false,
      issue: this.repairIssue,
    };
    console.log(newRepair);
    await this.repairsService.postNewRepair(newRepair);
    this._snackBar.open("Repair added", "close");
  } catch (error) {
    console.error('Error posting repair:', error);
    // Handle the error, possibly display an error message
    this._snackBar.open("Failed to post repair.", "close");
  }
}


onCarChange($event: MatSelectChange) {
  const carOption = this.cars.at($event.value)
  if (carOption) {
    this.setCarDataToUI(carOption);
  } else {
    console.log("Selected car not found.");
  }
}
  onClientChange($event: MatSelectChange) {
    // Check if selected client option exists
    const clientOption = this.clients.at($event.value)
    
    // If client option exists, update UI with client data
    if (clientOption) {
      this.setClientDataToUI(clientOption);
    } else {  
      console.log("Selected client not found.");
    }
  }
  async searchByPhone(){
    const client = await this.clientsService.searchByPhone(this.phoneNumber);
    if(client){
      const cars = await this.carsService.searchByClientPhone(client.phone)
      this.setClientDataToUI(client)
      this.clients=[]
      this.showClientsSelect=false
      this.showCarsSelect =false
      this.cars=[]
      if (cars && cars.length > 0) {
        cars.forEach(car=>{
          this.cars.push(car)
        })
        const firstCar = cars[0]; 
        this.selectedCar = 0
        this.setCarDataToUI(firstCar);
        if(this.cars.length>1){
          this.showCarsSelect = true
        }
      }
    }else{
      this.setUIToEmpty()
    }
  }
    async searchByCarNum() {
      const car = await this.carsService.searchByNumber(this.carNumber);
      if (car) {
        this.showCarsSelect=false
        this.showClientsSelect=false
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
          if(this.clients.length>1){
            this.showClientsSelect=true
              console.log(this.clients.length)
          }
        }
      }else{
        this.setUIToEmpty()
        
      }
      
    }
    
    setCarDataToUI(car: CarModel = { company: '', model: '', number: 0, code: 0 }): void {
      this.carCompany = car.company ;
      this.carModel = car.model ;
      this.carNumber = car.number ;
      this.carCode = car.code ;
    }
    setClientDataToUI(client: ClientModel = { firstName: '', lastName: '', phone: 0 }): void {
      this.firstName = client.firstName ;
      this.lastName = client.lastName ;
      this.phoneNumber = client.phone ;
    }
    setUIToEmpty(){
      this.carCompany = '' ;
      this.carModel ='' ;
      this.carNumber = '' ;
      this.carCode = '' ;
      this.firstName = '' ;
      this.lastName = '' ;
      this.phoneNumber = 0 ;
      this.cars=[]
      this.clients=[]
      this.showCarsSelect=false
      this.showClientsSelect=false
    }
}
