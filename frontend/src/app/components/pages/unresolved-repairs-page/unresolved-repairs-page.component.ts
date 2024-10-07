import { Component, inject, NgZone } from '@angular/core';
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
import { ChangeDetectorRef } from '@angular/core';
import { io, Socket } from "socket.io-client";

import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdModalContent } from '../../partials/modal/modal.component';
import { environment } from '../../../../environments/environment';
export interface RepairTableItem{
  repairId:string;
  carNumber:string;
  carCompany:string;
  carCode:string;
  fullName: string;
  phoneNumber: string;
  issue: string;
  
}


@Component({
  selector: 'app-unresolved-repairs',
  standalone: true,
  imports:[NgbModalModule,MatTableModule,MatInputModule,FormsModule,MatButtonModule,CommonModule,MatCardModule,MatExpansionModule,MatGridListModule,MatListModule],
  templateUrl: './unresolved-repairs-page.component.html',
  styleUrls: ['./unresolved-repairs-page.component.css'],

})
export class UnresolvedRepairsPageComponent {
  private modalService = inject(NgbModal);
onButtonClick(value: any) {
const modalRef = this.modalService.open(NgbdModalContent); 
modalRef.componentInstance.name = value.carNumber+" "+value.fullName;
modalRef.componentInstance.id = value.repairId;
}
  displayedColumns: string[] = ['carNumber', 'carCompany','carCode', 'fullName', 'phoneNumber','issue','actions'];
  unresolvedRepairs:any[]=[];
  ws: WebSocket | undefined;
  repairTable: RepairTableItem[]=[]
  private socket: Socket;
  constructor(private cdr:ChangeDetectorRef,private repairsService: RepairsService) { 
    //this.socket = io("http://localhost:8081");
    this.socket = io(environment.socketUrl,{withCredentials: true});
    this.socket.on("refreshRepairs", () => {
     this.getUnresolvedRepairs();
    });
  }



  async ngOnInit(): Promise<void> {
    this.getUnresolvedRepairs();
  }

  async getUnresolvedRepairs() {
    this.unresolvedRepairs   = await this.repairsService.getUnresolvedRepairs();
   // console.log(this.unresolvedRepairs);
    if(this.unresolvedRepairs){
      this.repairTable = this.unresolvedRepairs.map(item => ({
        repairId: item._id,
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
