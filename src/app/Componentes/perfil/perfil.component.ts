import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/service/auth.service';
import { UserProfileService } from 'src/app/shared/service/user-profile.service'; // Asegúrate de importar correctamente el servicio
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  userData: any;
  nombre: string = '';
  apellido: string = '';
  telefono: string = '';
  cedula: string = '';
  pais: string = '';
  email: string = '';
  modoEdicion = false;

  constructor(
    private authService: AuthService,
    private userProfileService: UserProfileService, // Inyecta el servicio UserProfileService
    private router: Router
  ) {}

  ngOnInit() {
    // Obtén los datos del usuario al iniciar la página desde AuthService
    this.userData = this.authService.getUserData();
    
    if (this.userData) {
      // Obtén los datos adicionales del usuario desde UserProfileService
      const userProfileData = this.userProfileService.getUserProfileData();
      
      // Actualiza los campos del perfil con los datos recuperados
      this.nombre = userProfileData.nombre;
      this.apellido = userProfileData.apellido;
      this.telefono = userProfileData.telefono;
      this.cedula = userProfileData.cedula;
      this.pais = userProfileData.pais;
      this.email = userProfileData.email;
    }
  }

  editarPerfil() {
    this.modoEdicion = true;
  }

  guardarCambios() {
    // Guarda los cambios en UserProfileService
    this.userProfileService.saveUserProfileData({
      nombre: this.nombre,
      telefono: this.telefono,
      cedula: this.cedula,
      pais: this.pais
    });

    this.modoEdicion = false;
    this.mostrarMensaje('Cambios guardados exitosamente');
  }

  mostrarMensaje(mensaje: string) {
    alert(mensaje);
  }

  cancelarEdicion() {
    const confirmacion = confirm('¿Estás seguro de que deseas cancelar la edición? Los cambios no guardados se perderán.');

    if (confirmacion) {
      // Recargar los datos del usuario desde UserProfileService para restaurar los valores originales
      this.ngOnInit();
      this.modoEdicion = false;
    }
  }

  regresar() {
    // Puedes realizar acciones adicionales si es necesario
    this.router.navigate(['/documento']);
  }
}
