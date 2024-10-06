import { ChangeDetectionStrategy,Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
@Component({
  selector: 'app-home-page',
  standalone: true,
 imports: [MatCardModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

}
