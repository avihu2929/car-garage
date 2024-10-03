import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { UsersService } from '../../../services/users.service';
import { FormsModule } from '@angular/forms';  //for input box
import { UserModel } from '../../../model/user.model';

@Component({
  selector: 'app-test-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './test-page.component.html',
  styleUrl: './test-page.component.css'
})
export class TestPageComponent {
  public users: UserModel[] = [];
  constructor(private usersService: UsersService) {
    usersService.getUsers().subscribe(users=> this.users = users);
  }
}
