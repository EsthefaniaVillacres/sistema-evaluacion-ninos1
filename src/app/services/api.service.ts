import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:3000/api/auth'; // Cambia la URL si es diferente
  private actividadesUrl = 'http://localhost:3000/api/actividades'; // Ruta base para actividades


  constructor(private http: HttpClient) { }

  // Función para registrar un usuario
  registerUser(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data);
  }

  // Función para iniciar sesión
  loginUser(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, data);
  }
  guardarRespuesta(datos: any) {
    return this.http.post(`${this.baseUrl}/actividades/respuestas-actividades`, datos);
  }

  // Guardar respuestas del primer juego de la básica
  guardarRespuestaBasica(datos: any): Observable<any> {
    return this.http.post(`${this.actividadesUrl}/guardar-respuesta-basica`, datos);
  }
  obtenerTotal(): Observable<any> {
    return this.http.get(`${this.actividadesUrl}/calcular-total`);
  }


  // Guardar respuestas de la básica superior
  guardarRespuestasSuperior(datos: any): Observable<any> {
    return this.http.post(`${this.actividadesUrl}/guardar-respuesta-superior`, datos);
  }

  obtenerRespuestasBasica(escuela: string): Observable<any> {
    return this.http.get(`${this.actividadesUrl}/respuestas-basica`, {
      params: { escuela },
    });
  }
  
  obtenerRespuestasSuperior(escuela: string): Observable<any> {
    return this.http.get(`${this.actividadesUrl}/respuestas-superior`, {
      params: { escuela },
    });
  }
  

  obtenerEstudiantes(escuela: string): Observable<any[]> {
    const params = new HttpParams().set('escuela', escuela);
    return this.http.get<any[]>(`${this.actividadesUrl}/estudiantes`, { params });
  }
  
  obtenerPromedioBasica(escuela: string): Observable<any> {
    const params = new HttpParams().set('escuela', escuela);
    return this.http.get(`${this.actividadesUrl}/promedio-basica`, { params });
  }
  
  obtenerPromedioSuperior(escuela: string): Observable<any> {
    const params = new HttpParams().set('escuela', escuela);
    return this.http.get(`${this.actividadesUrl}/promedio-superior`, { params });
  }
  

  obtenerRespuestasTodos(escuela: string): Observable<any> {
    const url = `/api/actividades/respuestas-todos?escuela=${encodeURIComponent(escuela)}`;
    return this.http.get<any>(url);
  }
  
  
  
  

}
