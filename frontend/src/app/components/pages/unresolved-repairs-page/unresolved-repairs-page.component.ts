import { Component, NgZone } from '@angular/core';
import { RepairsService } from '../../../services/repairs.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';

export interface RepairTableItem{
  carNumber:string;
  carCompany:string;
  carCode:string;
  fullName: string;
  phoneNumber: string;
  issue: string;
  
}
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];
@Component({
  selector: 'app-unresolved-repairs',
  standalone: true,
  imports:[MatTableModule,MatInputModule,FormsModule,MatButtonModule,CommonModule,MatCardModule,MatExpansionModule,MatGridListModule,MatListModule],
  templateUrl: './unresolved-repairs-page.component.html',
  styleUrls: ['./unresolved-repairs-page.component.css'],

})
export class UnresolvedRepairsPageComponent {
onButtonClick(_t66: any) {
console.log(_t66);
}
  displayedColumns: string[] = ['carNumber', 'carCompany','carCode', 'fullName', 'phoneNumber','actions'];
  unresolvedRepairs:any[]=[];
  ws: WebSocket | undefined;
  repairTable: RepairTableItem[]=[]

  constructor(private repairsService: RepairsService) { }
  typesOfFixes: string[] = ['10000', 'brakes-front', 'brakes-back', 'coils'];


  async ngOnInit(): Promise<void> {
    this.getUnresolvedRepairs();
  }

  async getUnresolvedRepairs() {
    this.unresolvedRepairs   = await this.repairsService.getUnresolvedRepairs();
   // console.log(this.unresolvedRepairs);
    if(this.unresolvedRepairs){
      this.repairTable = this.unresolvedRepairs.map(item => ({
        carNumber: item.car.number, 
        carCompany: item.car.company,
        carCode:item.car.code,
        fullName: item.client.firstName+" "+item.client.lastName,
        phoneNumber: item.client.phone,
        issue: item.issue
      }));
      console.log(this.repairTable)
    }
  }
  
}
