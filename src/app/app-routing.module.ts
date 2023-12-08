import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './Componentes/login/login.component';
import { RegistroComponent } from './Componentes/registro/registro.component';
import { DocumentoComponent } from './Componentes/documento/documento.component';
import { AddDocumentComponent } from './Componentes/add-document/add-document.component';
import { PerfilComponent } from './Componentes/perfil/perfil.component';
import { NotificacionComponent } from './Componentes/notificacion/notificacion.component';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {path: 'login', component: LoginComponent },
  {path: 'registro', component: RegistroComponent },
  {path: 'documento', component: DocumentoComponent,canActivate: [AuthGuard]},
  { path: 'add-document', component: AddDocumentComponent},
  {path: 'perfil', component: PerfilComponent},
  {path: 'notificacion', component: NotificacionComponent},
  {path: '', redirectTo: '/login',pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
