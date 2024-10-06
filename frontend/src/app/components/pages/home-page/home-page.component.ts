import { ChangeDetectionStrategy,Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { NgbCarouselConfig, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home-page',
  standalone: true,
 imports: [MatCardModule,NgbCarouselModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
  providers: [NgbCarouselConfig],
})

export class HomePageComponent {
  

}
