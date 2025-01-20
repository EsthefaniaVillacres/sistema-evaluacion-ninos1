import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-atencion-concentracion',
  imports: [CommonModule],
  templateUrl: './atencion-concentracion.component.html',
  styleUrls: ['./atencion-concentracion.component.css'],
})
export class AtencionConcentracionComponent implements OnInit {
  secuencia: string[] = ['🌞', '🌞', '🌞', '🌞', '🌜', '🌞', '🌞', '🌞'];
  indexDiferente: number = 4; // Índice del símbolo diferente
  seleccion: number | null = null; // Índice seleccionado por el usuario
  resultadoVisible: boolean = false; // Mostrar retroalimentación
  mensajeResultado: string = ''; // Mensaje de retroalimentación
  esCorrecto: boolean = false; // Indica si la respuesta es correcta
  cronometro: number = 10; // Tiempo restante
  cronometroInterval: any; // Intervalo del cronómetro
  botonSeguirVisible: boolean = false; // Mostrar botón de seguir

  ngOnInit(): void {
    this.iniciarCronometro();
  }

  iniciarCronometro(): void {
    this.cronometroInterval = setInterval(() => {
      this.cronometro--;
      if (this.cronometro === 0) {
        clearInterval(this.cronometroInterval);
        this.verificarRespuesta(); // Verificar automáticamente si no hay selección
      }
    }, 1000);
  }

  seleccionarIcono(index: number): void {
    if (this.resultadoVisible) return; // No permitir múltiples selecciones
    this.seleccion = index;
  }

  verificarRespuesta(): void {
    clearInterval(this.cronometroInterval);
    this.resultadoVisible = true;

    if (this.seleccion === this.indexDiferente) {
      this.esCorrecto = true;
      this.mensajeResultado = '¡Muy bien!';
    } else {
      this.esCorrecto = false;
      this.mensajeResultado = this.seleccion === null
        ? 'No seleccionaste ningún elemento.'
        : 'Podrías mejorar.';
    }

    this.botonSeguirVisible = true; // Mostrar botón de seguir
  }

  siguienteActividad(): void {
    // Lógica para pasar a la siguiente actividad (navegación u otra lógica)
    console.log('Ir a la siguiente actividad');
  }
  seguirActividad() {
    //this.router.navigate(['/sopa-letras]); // Cambia la ruta según la actividad siguiente
  }
}
