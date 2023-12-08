import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService, Documento } from 'src/app/shared/service/data.service';

@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.component.html',
  styleUrls: ['./add-document.component.css']
})
export class AddDocumentComponent {
  archivo: File | undefined;
  documento: Documento = {
    nombre: '',
    facultad: '',
    carrera: '',
    categoria: '',
    descripcion: '',
    contenido: '',
    idUsuario: '',
    fecha: '',
    destinatario: '',
    url: ''
  };
  facultades: string[]; 

  constructor(private router: Router, private dataService: DataService) {
    this.facultades = dataService.getFacultades();
    this.documento.facultad = this.facultades[0];
  }

  getCarrerasPorFacultad(): string[] {
    return this.dataService.getCarrerasPorFacultad(this.documento.facultad);
  }


  private guardarDatosEnLocalStorage(): void {
    const documentos: Documento[] = JSON.parse(localStorage.getItem('documents') || '[]');
    const index = documentos.findIndex((doc) => doc.nombre === this.documento.nombre);
    if (index !== -1) {
      documentos[index] = this.documento;
    } else {
      documentos.push(this.documento);
    }
    localStorage.setItem('documents', JSON.stringify(documentos));
  }


guardarDocumento(): void {
  if (this.archivo) {
    const reader = new FileReader();

    reader.onload = (e) => {
      const contenido = (e.target!.result as string) || '';
      this.documento.contenido = contenido;

      // Agregar fecha y hora actual
      const fechaHora = new Date();
      this.documento.fecha = fechaHora.toLocaleString();

      // Agregar destinatario (asegúrate de tener un campo en el formulario para el destinatario)
      // this.documento.destinatario = valorDelCampoDestinatario;
      if (this.documento.nombre && this.documento.nombre !== this.documento.nombre) {
        const documentos = JSON.parse(localStorage.getItem('documents') || '[]');
        const index = documentos.findIndex((doc: Documento) => doc.nombre === this.documento.nombre);
        if (index !== -1) {
          // Actualizar el nombre en el documento almacenado
          documentos[index].nombre = this.documento.nombre;
          localStorage.setItem('documents', JSON.stringify(documentos));
        }
      }

      // Guardar el documento en el servicio
      this.dataService.addDocumento(this.documento);

      // Obtener el enlace del documento
      const enlace = this.dataService.getEnlaceDocumento(this.documento.nombre);

      this.guardarDatosEnLocalStorage();
      alert('Documento guardado correctamente.');
      this.router.navigate(['/documento']);
    };

    reader.readAsText(this.archivo);
  } else {
    alert('Por favor, seleccione un archivo antes de guardar.');
  }
}

  cancelar(): void {
    // Mostrar un mensaje de advertencia antes de redirigir
    const confirmacion = window.confirm('¿Seguro que quieres cancelar? Los cambios no se guardarán.');
  
    // Verificar la respuesta del usuario
    if (confirmacion) {
      // El usuario confirmó, redirigir a la página '/documento'
      this.router.navigate(['/documento']);
    } else {
      // El usuario canceló, no realizar ninguna acción
      // Puedes agregar un mensaje adicional o realizar otras acciones si es necesario
      console.log('Cancelación de la operación.');
    }
  }
  

  onFileSelected(event: any): void {
  this.archivo = event.target.files[0];

  if (this.archivo) {
    // Extraer el nombre del archivo sin la extensión
    const nombreArchivo = this.archivo.name.replace(/\.[^/.]+$/, "");

    // Asignar el nombre del archivo al documento
    this.documento.nombre = nombreArchivo;

    // Almacenar el nombre original para edición posterior
    this.documento.nombre = nombreArchivo;

    const reader = new FileReader();

    reader.onload = (e) => {
      const contenido = (e.target!.result as string) || '';
      this.documento.contenido = contenido;
    };

    reader.onerror = (error) => {
      console.error('Error al leer el archivo:', error);
      alert('Error al leer el archivo. Por favor, intenta de nuevo.');
    };

    reader.readAsText(this.archivo);
    }
  } 
}