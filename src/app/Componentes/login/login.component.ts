import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
passwordIncorrecto: any;

  constructor( private authService : AuthService) {
  }

  login(email: string, password: string ){
    this.authService.logInWithEmailAndPassword(email, password);
  }

  logInWithGoogle(){
    this.authService.logInWithGoogleProvider();
  }
}
