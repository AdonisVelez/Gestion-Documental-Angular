import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { GoogleAuthProvider } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any;

  constructor(
    private firebaseAuthenticationService: AngularFireAuth,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.firebaseAuthenticationService.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
      } else {
        localStorage.setItem('user', 'null');
      }
    });
  }

  getUserData(): any {
    return this.userData;
  }

  logInWithEmailAndPassword(email: string, password: string) {
    return this.firebaseAuthenticationService
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        this.userData = userCredential.user;
        this.observerUserState();
      })
      .catch((error) => {
        if (error.code === 'auth/invalid-login-credentials') {
          alert(
            'Credenciales de inicio de sesión inválidas. Verifica tu correo electrónico y contraseña.'
          );
        } else {
          alert(
            'Error durante el inicio de sesión. Por favor, inténtalo de nuevo.'
          );
        }
      });
  }

  logInWithGoogleProvider() {
    return this.firebaseAuthenticationService
      .signInWithPopup(new GoogleAuthProvider())
      .then(() => this.observerUserState())
      .catch((error: Error) => {
        alert(error.message);
      });
  }

  signUpWithEmailAndPassword(
    email: string,
    password: string,
    displayName: string
  ) {
    return this.firebaseAuthenticationService
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        this.userData = userCredential.user;
        this.userData.displayName = displayName;
        this.observerUserState();
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  observerUserState() {
    this.firebaseAuthenticationService.authState.subscribe((userState) => {
      userState &&
        this.ngZone.run(() => this.router.navigate(['/documento']));
    });
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null;
  }

  logOut() {
    return this.firebaseAuthenticationService.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['/login']);
    });
  }

  actualizarPerfil(nuevosDatos: { displayName: string; telefono: string; cedula: string; pais: string }): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (this.userData) {
        // Actualizar propiedades del usuario en Firebase
        this.userData.updateProfile({
          displayName: nuevosDatos.displayName,
        }).then(() => {
          // Actualizar propiedades adicionales en tu aplicación
          this.userData.telefono = nuevosDatos.telefono;
          this.userData.cedula = nuevosDatos.cedula;
          this.userData.pais = nuevosDatos.pais;
          resolve(); // Resuelve la promesa después de la actualización exitosa
        }).catch((error: Error) => {
          console.error('Error al actualizar el perfil:', error);
          reject(error); // Rechaza la promesa en caso de error
        });
      } else {
        reject(new Error('No hay usuario para actualizar.'));
      }
    });
  }

}
