import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userData: { username: string, password: string } = { username: '', password: '' };
  loginForm: FormGroup;
  passwordIncorrecto: any;

  constructor(private formBuilder: FormBuilder) {
    // Constructor del componente
    // - Inicializa el formulario de inicio de sesión con campos y validadores
    this.loginForm = this.formBuilder.group({
      // Campo de correo electrónico con validaciones
      email: ['', [Validators.required, Validators.email]],
       // Campo de contraseña con validaciones
      password: ['', [Validators.required]], 
    });
  }

  // Método que se ejecuta al enviar el formulario de inicio de sesión
  onSubmit() {
    if (this.loginForm.valid) {
      const username = this.loginForm.get('username')?.value;
      const password = this.loginForm.get('password')?.value;
    }
  }
}
