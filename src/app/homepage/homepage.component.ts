import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { RouterModule } from '@angular/router';
import { UserService } from '../service/user/User.service';

@Component({
  selector: 'app-homepage',
  standalone: true,
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
  imports: [HeaderComponent, RouterModule]
})
export class HomepageComponent {

  date: Number = new Date().getFullYear();
  user: string = '';

  constructor(public userService: UserService) {

  }

  ngOnInit(): void {
    this.userService.currentUser.subscribe((name) => {
      this.user = name;
    });
  }

}
