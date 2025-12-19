import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  signupForm;

  constructor(
    private fb: FormBuilder,
    private auth: Auth,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  submit() {
    if (this.signupForm.invalid) return;

    const signupForm = {
      email: this.signupForm.get('email')?.value,
      fullName: this.signupForm.get('fullName')?.value,
      password: this.signupForm.get('password')?.value
    };

    this.auth.signup(signupForm).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (err) => alert(err.error?.message || 'Signup failed')
    });
  }
}
