import { Component ,OnInit  } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { tokenRemovedEvent } from '../../../../events';
import { ChangeDetectorRef } from '@angular/core';
import { tokenAddedEvent } from '../../../../events';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,FormsModule,MatMenuModule,MatButtonModule,RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent {
logout() {
   localStorage.removeItem('token');
   this.tokenIsValid = false;
   this.router.navigate(['']);
}
  tokenIsValid: boolean= true;
  constructor(private cdr: ChangeDetectorRef,protected router: Router) {}
  ngOnInit() {
    this.tokenIsValid = !!localStorage.getItem('token');
    console.log("tokein is "+this.tokenIsValid)
    tokenRemovedEvent.subscribe(() => {
      this.tokenIsValid = false;
      this.cdr.detectChanges();
    });
    tokenAddedEvent.subscribe(() => {
      this.tokenIsValid = true;
      this.cdr.detectChanges();
    });
  }
}
