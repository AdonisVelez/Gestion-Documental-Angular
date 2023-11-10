import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  registroForm: FormGroup;
  formSubmitted = false;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    //Inicializa el formulario de registro con campos y validadores
    this.registroForm = this.formBuilder.group({
      nombre: ['', [Validators.required]], //Validación de requerido 
      apellido: ['', [Validators.required]], //Validación de requerido 
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)]], //Validación de requerido y formato de contraseñas
      correo: ['', [Validators.required, Validators.email]], //Validación de requerido y formato de email
      telefono: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]], //Validación de requerido y formato de telefono
      cedula: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]], //Validación de requerido y formato de Cedelua
      pais: ['', [Validators.required]],//Validación de requerido
    });
  }

  // Metodo para dirigir al incio al dar clic en el boton atras
  regresar() {
    this.router.navigate(['/login']);
  }
  
  //Método que se ejecuta al enviar el formulario de registro y me direcciona al login
  onSubmit() {
    this.formSubmitted = true; 
    if (this.registroForm.valid) {
      this.router.navigate(['/login']);
    }
  }
}
