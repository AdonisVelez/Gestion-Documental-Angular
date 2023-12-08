import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-notificacion',
  templateUrl: './notificacion.component.html',
  styleUrls: ['./notificacion.component.css']
})
export class NotificacionComponent { 

  constructor (private router: Router){}
  
  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}