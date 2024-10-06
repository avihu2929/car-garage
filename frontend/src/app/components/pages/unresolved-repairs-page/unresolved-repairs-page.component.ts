import { Component, NgZone } from '@angular/core';
import { RepairsService } from '../../../services/repairs.service';
import { RepairModel } from '../../../model/repair.model';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';

@Component({
  selector: 'app-unresolved-repairs',
  standalone: true,
  imports:[CommonModule,MatCardModule,MatExpansionModule],
  templateUrl: './unresolved-repairs-page.component.html',
  styleUrls: ['./unresolved-repairs-page.component.css'],

})
export class UnresolvedRepairsPageComponent {

  unresolvedRepairs:any[]=[];
  ws: WebSocket | undefined;
  constructor(private repairsService: RepairsService) { }



  async ngOnInit(): Promise<void> {
    try {
      this.unresolvedRepairs  = await this.repairsService.getUnresolvedRepairs();
      console.log('Unresolved repairs retrieved successfully', this.unresolvedRepairs);
    } catch (error) {
      console.error('Error retrieving unresolved repairs:', error);
    }
  }
  
}
