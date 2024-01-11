import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { PasswordModule } from 'primeng/password';
import { UserService } from '../service/user/User.service';
import { HotToastService } from '@ngneat/hot-toast';
import { User } from '../model/user';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [PasswordModule, ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup = new FormGroup({});
  private toastService = inject(HotToastService);


  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],

    });
  }

  onSubmit() {
    console.log(this.loginForm.value);
    this.userService.login(this.loginForm.value).subscribe({
      next: (response: User) => {
        this.toastService.success('login Successful')
        this.router.navigate(['/products'])
      },
      error: (err) => {
        this.toastService.error(err.error.message)
      }
    })
  }


}
