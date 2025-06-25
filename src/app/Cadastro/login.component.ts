import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Necessário para *ngIf
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router'; // Router pode ser útil, mas o AuthService já redireciona

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }
    
    this.errorMessage = null;
    const { email, password } = this.loginForm.value;

    const success = this.authService.login(email, password);

    if (!success) {
      this.errorMessage = 'E-mail ou senha inválidos.';
    }
  }
}