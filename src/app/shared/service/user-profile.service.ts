import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  private readonly localStorageKey = 'userProfileData';
  private userProfileData: any; // Ajusta este tipo según la estructura de tu perfil de usuario

  constructor() {
    // Intentar cargar los datos del perfil desde localStorage al inicializar el servicio
    const storedData = localStorage.getItem(this.localStorageKey);
    this.userProfileData = storedData ? JSON.parse(storedData) : {};
  }

  saveUserProfileData(data: any): void {
    // Guardar los datos en el objeto userProfileData y en localStorage
    this.userProfileData = { ...this.userProfileData, ...data };
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.userProfileData));
  }

  getUserProfileData(): any {
    // Obtener los datos del perfil
    return { ...this.userProfileData };
  }
}
