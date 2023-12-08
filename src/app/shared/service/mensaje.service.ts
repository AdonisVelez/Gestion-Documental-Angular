// mensaje.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Mensaje {
  remitente: string;
  fecha: string;
  asunto: string;
  contenido: string;
}

@Injectable({
  providedIn: 'root',
})
export class MensajeService {
  private mensajes: Mensaje[] = [];
  private mensajesSubject: BehaviorSubject<Mensaje[]> = new BehaviorSubject<Mensaje[]>([]);

  get mensajes$(): Observable<Mensaje[]> {
    return this.mensajesSubject.asObservable();
  }

  enviarMensaje(mensaje: Mensaje): void {
    this.mensajes.push(mensaje);
    this.mensajesSubject.next([...this.mensajes]);
  }
}
