import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-encuentra-diferente',
  imports: [CommonModule,MatIcon],
  templateUrl: './encuentra-diferente.component.html',
  styleUrls: ['./encuentra-diferente.component.css']
})
export class EncuentraDiferenteComponent implements OnInit {
  gridSize: number = 4; // Tamaño inicial de la cuadrícula
  grid: string[][] = [];
  diferente: { fila: number; columna: number } | null = null;
  tiempoRestante: number = 20; // Tiempo inicial
  cronometroInterval: any;
  mensaje: string = '';
  puntaje: number = 0;
  nivel: number = 1; // Nivel inicial
  maxNiveles: number = 5; // Límite de niveles
  mostrarModal: boolean = false; // Control del modal
  baseEmoji: string = 'base'; // Clase CSS para el cuadro base
  diferenteEmoji: string = 'diferente'; // Clase CSS para el cuadro diferente

  constructor(private router: Router,private apiService: ApiService) {}

  ngOnInit(): void {
    this.iniciarJuego();
  }

  iniciarJuego(): void {
    this.nivel = 1;
    this.puntaje = 0;
    this.tiempoRestante = 20;
    this.mostrarModal = false;
    this.generarGrid();
    this.actualizarColores();
    this.iniciarCronometro();
  }

  generarGrid(): void {
    this.grid = Array.from({ length: this.gridSize }, () =>
      Array.from({ length: this.gridSize }, () => this.baseEmoji)
    );

    const fila = Math.floor(Math.random() * this.gridSize);
    const columna = Math.floor(Math.random() * this.gridSize);
    this.grid[fila][columna] = this.diferenteEmoji;
    this.diferente = { fila, columna };
  }

  seleccionarElemento(fila: number, columna: number): void {
    if (this.diferente && fila === this.diferente.fila && columna === this.diferente.columna) {
      this.puntaje += 2;
      this.mensaje = '¡Correcto!';

      if (this.nivel < this.maxNiveles && this.puntaje < 10) {
        this.nivel++;
        this.gridSize = Math.min(10, this.gridSize + 1);
        this.generarGrid();
        this.actualizarColores();
      } else {
        this.finalizarJuego();
      }
    } else {
      this.mensaje = 'Intenta de nuevo.';
    }
  }

  iniciarCronometro(): void {
    if (this.cronometroInterval) {
      clearInterval(this.cronometroInterval);
    }
    this.cronometroInterval = setInterval(() => {
      this.tiempoRestante--;
      if (this.tiempoRestante === 0) {
        clearInterval(this.cronometroInterval);
        this.finalizarJuego();
      }
    }, 1000);
  }

  actualizarColores(): void {
    const baseColorValue = 153 - this.nivel * 10;
    const diferenteColorValue = baseColorValue - 21;

    const baseColor = `rgb(255, ${baseColorValue}, ${baseColorValue})`;
    const diferenteColor = `rgb(255, ${diferenteColorValue}, ${diferenteColorValue})`;

    document.documentElement.style.setProperty('--base-color', baseColor);
    document.documentElement.style.setProperty('--diferente-color', diferenteColor);
  }

  finalizarJuego(): void {
    clearInterval(this.cronometroInterval);
    this.mostrarModal = true;
    this.guardarResultado();
  }
  
  obtenerMensajeFinal(): string {
    if (this.puntaje >= 7) {
      return '¡Excelente!';
    } else {
      return '¡Sigue practicando! Lo estás haciendo muy bien.';
    }
  }
  guardarResultado() {
    const usuario_id = localStorage.getItem('userId'); // Obtener el ID dinámico
    const usuario_tipo = localStorage.getItem('userType'); // Obtener el tipo dinámico
  
    if (!usuario_id || !usuario_tipo) {
      console.error('Datos de usuario no disponibles en localStorage.');
      return;
    }
  
    const datos = {
      usuario_id, // ID dinámico
      usuario_tipo, // Tipo dinámico
      juego3_puntaje: this.puntaje,
    };
  
    this.apiService.guardarRespuestaBasica(datos).subscribe({
      next: () => console.log('Puntaje guardado correctamente'),
      error: (err) => console.error('Error al guardar el puntaje:', err),
    });
  }
  
  continuar(): void {
    this.router.navigate(['/packing-game']); // Cambia 'siguiente-actividad' por la ruta correcta
  }
  
}
