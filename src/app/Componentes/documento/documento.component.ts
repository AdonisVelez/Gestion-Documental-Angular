import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Documento {
  tipo: string;
  carrera: string;
  nombre: string;
  categoria: string;
  url: string;
  marcado: boolean;
  fecha: string;
  destinatario: string;
  facultad: string;
  descripcion: string;
  contenido: string;
}

@Component({
  selector: 'app-documento',
  templateUrl: './documento.component.html',
  styleUrls: ['./documento.component.css']
})
export class DocumentoComponent implements OnInit {
  documentList: Documento[] = [];
  originalDocumentList: Documento[] = [];
  categorySelectValue: string = 'todos';
  searchInput: string = ''; 
  noResultsFound: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.actualizarDocumentosDesdeLocalStorage();
  }

  verDocumento(documento: Documento): void {
    if (documento && documento.contenido && documento.tipo) {
      // Crear un Blob con el contenido y el tipo de archivo
      const blob = new Blob([documento.contenido], { type: documento.tipo });
  
      // Crear una URL para el Blob
      const blobUrl = URL.createObjectURL(blob);
  
      // Abrir el Blob en una nueva ventana
      const nuevaVentana = window.open(blobUrl, '_blank');
  
      // Liberar la URL del Blob después de que la ventana se ha abierto
      if (nuevaVentana) {
        nuevaVentana.onload = () => {
          URL.revokeObjectURL(blobUrl);
        };
      } else {
        console.error('No se pudo abrir la nueva ventana');
      }
    } else {
      console.error('El documento, el contenido o el tipo no están definidos');
    }
  }
  
  
  buscarDocumentos(): void {
    if (this.searchInput.trim() === '') {
      this.filtrarDocumentosPorCategoria();
      this.noResultsFound = false;
    } else {
      const documentosEncontrados = this.originalDocumentList.filter(
        doc =>
          doc.nombre.toLowerCase().includes(this.searchInput.toLowerCase()) ||
          doc.descripcion.toLowerCase().includes(this.searchInput.toLowerCase())
      );
  
      this.documentList = documentosEncontrados;
      this.noResultsFound = documentosEncontrados.length === 0;
    }
  }
  

  onSearchInputChange(): void {
    this.buscarDocumentos();
  }

  agregarDocumento(): void {
    this.router.navigate(['/add-document']);
  }

  eliminarDocumentosMarcados(): void {
    this.documentList = this.documentList.filter((documento: Documento) => !documento.marcado);
    this.actualizarLocalStorage();
    this.filtrarDocumentosPorCategoria();
  }

  editarDocumento(documento?: Documento): void {
    if (documento) {
      const index = this.documentList.indexOf(documento);
      if (index !== -1) {
        localStorage.setItem('documentoEditar', JSON.stringify(documento));
        this.router.navigate(['/add-document']);
      }
    }
  }  

  seleccionarDocumento(documento: Documento): void {
    documento.marcado = !documento.marcado;
    this.actualizarLocalStorage();
    this.filtrarDocumentosPorCategoria();
  }

  seleccionarTodos(): void {
    const todosSeleccionados = this.documentList.every(doc => doc.marcado);
    this.documentList.forEach(doc => (doc.marcado = !todosSeleccionados));
    this.actualizarLocalStorage();
    this.filtrarDocumentosPorCategoria();
  }  

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  private actualizarDocumentosDesdeLocalStorage(): void {
    const storedDocuments = localStorage.getItem("documents");
    this.originalDocumentList = storedDocuments ? JSON.parse(storedDocuments) : [];
    this.filtrarDocumentosPorCategoria();
  }
  
  filtrarDocumentosPorCategoria(): void {
    if (this.categorySelectValue === 'todos') {
      this.documentList = [...this.originalDocumentList];
    } else {
      this.documentList = this.originalDocumentList.filter(doc => doc.categoria === this.categorySelectValue);
    }
  }  

  private actualizarLocalStorage(): void {
    localStorage.setItem("documents", JSON.stringify(this.documentList));
  }  
}
