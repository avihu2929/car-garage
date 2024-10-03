import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { RouterModule } from '@angular/router';
interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule,MatMenuModule,MatButtonModule,RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  foods: Food[] = [
    {value: 'steak-0', viewValue: 'טיפולים פתוחים'},
    {value: 'pizza-1', viewValue: 'הוספת טיפול'},
    {value: 'tacos-2', viewValue: 'היסטורייה'},
  ];
}
