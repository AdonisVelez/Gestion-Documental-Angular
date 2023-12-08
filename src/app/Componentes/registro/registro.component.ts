import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/service/auth.service';
import { UserProfileService } from 'src/app/shared/service/user-profile.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  registroForm: FormGroup;
  formSubmitted = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private userProfileService: UserProfileService,
    private router: Router
  ) {
    this.registroForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      cedula: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      pais: ['', [Validators.required]],
    });
  }

  get nombreControl() {
    return this.registroForm.get('nombre');
  }

  get apellidoControl() {
    return this.registroForm.get('apellido');
  }

  get passwordControl() {
    return this.registroForm.get('password');
  }

  get emailControl() {
    return this.registroForm.get('email');
  }

  get telefonoControl() {
    return this.registroForm.get('telefono');
  }

  get cedulaControl() {
    return this.registroForm.get('cedula');
  }

  get paisControl() {
    return this.registroForm.get('pais');
  }

  regresar() {
    this.router.navigate(['/login']);
  }

  signUp(): void {
    if (this.registroForm.valid) {
      const email = this.emailControl?.value;
      const password = this.passwordControl?.value;
      const nombre = this.nombreControl?.value;
      const apellido = this.apellidoControl?.value;
      const displayName = `${this.nombreControl?.value} ${this.apellidoControl?.value}`;
      const telefono = this.telefonoControl?.value;
      const cedula = this.cedulaControl?.value;
      const pais = this.paisControl?.value;

      this.authService.signUpWithEmailAndPassword(email, password, displayName)
        .then(() => {
          // Guardar información en UserProfileService
          this.userProfileService.saveUserProfileData({
            email,
            nombre,
            apellido,
            telefono,
            cedula,
            pais,
          });

          this.router.navigate(['/login']);
        })
        .catch((error: any) => {
          console.error(error);
          // Trata el error de manera más apropiada aquí
        });
    }
  }

  onSubmit() {
    this.formSubmitted = true;
    this.signUp();
  }
}