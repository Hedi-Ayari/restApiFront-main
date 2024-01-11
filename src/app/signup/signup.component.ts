import { Component, inject } from '@angular/core';
import { PasswordModule } from 'primeng/password';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../service/user/User.service';
import { HotToastService } from '@ngneat/hot-toast';
import { User } from '../model/user';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [PasswordModule, ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',

})
export class SignupComponent {
  signupForm: FormGroup = new FormGroup({});
  private toastService = inject(HotToastService);

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmedPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  onSubmit() {
    this.userService.signup(this.signupForm.value).subscribe({
      next: (response: User) => {
        this.toastService.success('Signup Successful')
        this.router.navigate(['/products'])
      },
      error: (err) => {
        this.toastService.error(err.error.message)
      }
    })
  }
}
