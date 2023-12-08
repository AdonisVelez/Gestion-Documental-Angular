import { Injectable } from "@angular/core";

export interface Documento {
  fecha: string;
  idUsuario: any;
  nombre: string;
  facultad: string;
  carrera: string;
  categoria: string;
  url: string;
  descripcion: string;
  contenido: string;
  destinatario?: string;
  tipo?: string;
}

type CarrerasPorFacultad = {
    [facultad: string]: string[];
  };
  
  @Injectable({
    providedIn: 'root',
  })
  export class DataService {
    getFacultades(): string[] {
      return [
        'CIENCIAS DE LA SALUD',
        'CIENCIAS ADMINISTRATIVAS CONTABLES Y COMERCIO',
        'EDUCACION TURISMO ARTES Y HUMANIDADES',
        'INGENIERÍA INDUSTRIA Y ARQUITECTURA',
        'CIENCIAS DE LA VIDA Y TECNOLOGÍAS',
        'CIENCIAS SOCIALES DERECHO Y BIENESTAR',
      ];
    }
  
    getCarrerasPorFacultad(facultad: string): string[] {
      const carrerasPorFacultad: CarrerasPorFacultad = {
        'CIENCIAS DE LA SALUD': [
          'Medicina', 'Odontología', 'Enfermería', 'Fisioterapia',
          'Fonoaudiología', 'Laboratorio Clínico', 'Terapia Ocupacional', 'Psicología',
        ],
        'CIENCIAS ADMINISTRATIVAS CONTABLES Y COMERCIO': [
          'Administración de Empresas', 'Mercadotecnia', 'Contabilidad y Auditoría',
          'Auditoría y Control de Gestión', 'Finanzas', 'Comercio Exterior',
          'Gestión de la Información Gerencial', 'Gestión del Talento Humano',
        ],
        'EDUCACION TURISMO ARTES Y HUMANIDADES': [
          'Educación Inicial', 'Educación Especial', 'Psicología Educativa',
          'Educación Básica', 'Pedagogía de la Actividad Física y el Deporte',
          'Pedagogía de la Lengua y la Literatura', 'Pedagogía de los Idiomas Nacionales y Extranjeros',
          'Turismo', 'Hospitalidad y Hotelería', 'Artes Plásticas', 'Sociología',
        ],
        'INGENIERÍA INDUSTRIA Y ARQUITECTURA': [
          'Ingeniería Civil', 'Ingeniería Marítima', 'Electricidad', 'Arquitectura',
          'Ingeniería Industrial', 'Ingeniería de Alimentos',
        ],
        'CIENCIAS DE LA VIDA Y TECNOLOGÍAS': [
          'Ingeniería Agropecuaria', 'Agronegocios', 'Ingeniería Agroindustrial',
          'Ingeniería Ambiental', 'Ingeniería en Tecnologías de la Información',
          'Ingeniería en Software', 'Ingeniería en Sistema', 'Biología',
        ],
        'CIENCIAS SOCIALES DERECHO Y BIENESTAR': [
          'Derecho', 'Economía', 'Trabajo Social', 'Comunicación',
        ],
      };
  
      return carrerasPorFacultad[facultad] || [];
    }

    getDocumentos(): Documento[] {
      const idUsuario = JSON.parse(localStorage.getItem('user') || '{}').uid;
      const documentos: Documento[] = JSON.parse(localStorage.getItem('documents') || '[]');
  
      return documentos.filter(doc => doc.idUsuario === idUsuario);
    }

  addDocumento(documento: Documento): void {
    // Obtener la extensión del archivo desde el nombre del documento
    const extension = documento.nombre.split('.').pop();

    // Crear un objeto con la información del tipo de archivo y el contenido
    const documentoConTipo: Documento = {
      ...documento,
      tipo: extension || undefined, // Hacer 'tipo' opcional solo si extension está presente
    };

    const documentos: Documento[] = JSON.parse(localStorage.getItem('documents') || '[]');
    documentos.push(documentoConTipo);
    localStorage.setItem('documents', JSON.stringify(documentos));
  }  

  
  getEnlaceDocumento(nombre: string): string | null {
    const documentos: Documento[] = this.getDocumentos();
    const documento = documentos.find(doc => doc.nombre === nombre);
    return documento ? `enlace-al-documento/${nombre}` : null;
  }
}