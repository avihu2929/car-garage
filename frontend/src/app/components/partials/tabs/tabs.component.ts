import { Component } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { AddCarPageComponent } from "../../pages/add-car-page/add-car-page.component";
import { AddClientPageComponent } from "../../pages/add-client-page/add-client-page.component";
import { AddRepairPageComponent } from "../../pages/add-repair-page/add-repair-page.component";
@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [MatTabsModule, AddCarPageComponent, AddClientPageComponent, AddRepairPageComponent],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.css'
})
export class TabsComponent {

}
