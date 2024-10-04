import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CarsService } from '../../../services/cars.service';
import { CarModel } from '../../../model/car.model';
interface Company {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-add-car-page',
  standalone: true,
  imports: [MatInputModule,MatFormFieldModule,ReactiveFormsModule,MatSelectModule,FormsModule],
  templateUrl: './add-car-page.component.html',
  styleUrl: './add-car-page.component.css'
})
export class AddCarPageComponent {

carNumber: any;
selectedCompany: any;
carModel: any;
carCode: any;


  constructor(private carsService: CarsService) {} // Correctly inject the service

  async addCar(): Promise<void> {
    const newCar={number:this.carNumber,company:this.selectedCompany,model:this.carModel,code:this.carCode}
     await this.carsService.addCar(newCar);
    //console.log(this.selectedCompany,this.carCode,this.carModel,this.carNumber)

  }
  companies: Company[] = [
    {value: 'mazda', viewValue: 'Mazda'},
    {value: 'subaru', viewValue: 'Subaru'},
    {value: 'toyota', viewValue: 'Toyota'},
  ];
}
