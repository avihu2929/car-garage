import { Component, inject, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatListModule } from '@angular/material/list'; // Add this import
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input'; // Add this import
import { CommonModule } from '@angular/common';
import { RepairsService } from '../../../services/repairs.service';

@Component({
	selector: 'ngbd-modal-content',
	standalone: true,
  imports: [CommonModule,MatButtonModule,MatListModule,MatInputModule],
	template: `
<div>
  <p>{{name}}</p>
    <mat-selection-list #fixes>
    <mat-list-option *ngFor="let fix of typesOfFixes" [value]="fix">{{ fix }}</mat-list-option>
    </mat-selection-list>
    <mat-form-field class="mat-form-field">
      <mat-label>Cost</mat-label>
      <input matInput type="number" #cost >
    </mat-form-field>
    <div fxLayout="row" fxLayoutAlign="end center">
      <button mat-flat-button (click)="finish(fixes.selectedOptions.selected,cost.value)" class="adjusted-width">Finish</button>
    </div>

  </div>
	`,
})
export class NgbdModalContent {
	activeModal = inject(NgbActiveModal);
  constructor(private repairsService:RepairsService) { }
  typesOfFixes: string[] = ['10000', 'brakes-front', 'brakes-back', 'coils'];
	@Input() name: string | undefined;
  @Input() id: string | undefined;

  async finish(selectedOptions: any,cost:any) {
    const selectedValues = selectedOptions.map((option: any) => option.value);
    if(this.id){
      await this.repairsService.patchRepair(this.id,selectedValues,cost);
      this.activeModal.dismiss();
 
    }
  }
}

@Component({
	selector: 'ngbd-modal-component',
	standalone: true,
	templateUrl: './modal.component.html',
})
export class NgbdModalComponent {
	private modalService = inject(NgbModal);

	open() {
		const modalRef = this.modalService.open(NgbdModalContent);
		modalRef.componentInstance.name = 'World';
	}
}