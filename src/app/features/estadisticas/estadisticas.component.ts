import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-estadisticas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {
  escuelas: string[] = ['E.B Tsunki', 'U.E Tobias Celestino Zanimba Gavilanes'];
  respuestasBasica: any[] = [];
  respuestasSuperior: any[] = [];
  filtros = { escuela: '' };

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    // Inicialización si se requiere.
  }

  cargarRespuestas(): void {
    if (!this.filtros.escuela) {
      console.error('Debe seleccionar una escuela.');
      return;
    }

    // Carga de respuestas básicas
    this.apiService.obtenerRespuestasBasica(this.filtros.escuela).subscribe(
      (data) => {
        console.log('Respuestas Básica:', data);
        this.respuestasBasica = data;
      },
      (error) => {
        console.error('Error al cargar respuestas básicas:', error);
        this.respuestasBasica = [];
      }
    );

    // Carga de respuestas superiores
    this.apiService.obtenerRespuestasSuperior(this.filtros.escuela).subscribe(
      (data) => {
        console.log('Respuestas Superior:', data);
        this.respuestasSuperior = data;
      },
      (error) => {
        console.error('Error al cargar respuestas superiores:', error);
        this.respuestasSuperior = [];
      }
    );
  }
}
