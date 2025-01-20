import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../services/api.service';



@Component({
  selector: 'app-actividades-basica',
  standalone: true,
  imports: [
    CommonModule,
    DragDropModule,
    MatIconModule, 
  ],
  templateUrl: './actividades-basica.component.html',
  styleUrls: ['./actividades-basica.component.css'],
})
export class ActividadesBasicaComponent {
  iconosOriginales: string[] = ['home', 'wb_sunny', 'park', 'pets', 'menu_book', 'water', 'table_bar', 'brightness_3', 'local_florist', 'watch'];
  iconosDesordenados: string[] = [];
  mensajeResultado: string = '';
  estrellas: string[] = [];
  resultadoVisible: boolean = false;
  mostrandoPalabras: boolean = true;
  palabrasCorrectas: number = 0;
  tiempoRestante: number = 30;
  intervalo: any;

  constructor(private router: Router, private apiService: ApiService ) {
    this.iniciarActividad();
  }

  iniciarActividad() {
    this.mostrandoPalabras = true;
    this.resultadoVisible = false;
    this.palabrasCorrectas = 0;
    this.iconosDesordenados = [...this.iconosOriginales].sort(() => Math.random() - 0.5);

    setTimeout(() => {
      this.mostrandoPalabras = false;
      this.iniciarCronometro();
    }, 20000);
  }

  iniciarCronometro() {
    this.intervalo = setInterval(() => {
      if (this.tiempoRestante > 0) {
        this.tiempoRestante--;
      } else {
        clearInterval(this.intervalo);
        this.verificarOrden();
      }
    }, 2000);
  }

  verificarOrden() {
    clearInterval(this.intervalo);

    this.palabrasCorrectas = this.iconosDesordenados.reduce((count, icon, index) => {
      return count + (icon === this.iconosOriginales[index] ? 1 : 0);
    }, 0);

    this.generarModalResultado();
    this.guardarRespuesta();
  }

  generarModalResultado() {
    if (this.palabrasCorrectas <= 3) {
      this.mensajeResultado = 'Puedes mejorar';
      this.estrellas = ['star'];
    } else if (this.palabrasCorrectas <= 6) {
      this.mensajeResultado = 'Muy bien, pero puedes hacerlo mejor';
      this.estrellas = ['star', 'star'];
    } else {
      this.mensajeResultado = '¡Excelente!';
      this.estrellas = ['star', 'star', 'star'];
    }

    this.resultadoVisible = true;
  }

  reordenarIconos(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.iconosDesordenados, event.previousIndex, event.currentIndex);
  }

  seguir() {
    this.router.navigate(['/memoria-asociativa']); // Ajusta la ruta según tu aplicación
  }
  guardarRespuesta() {
    const usuario_id = localStorage.getItem('userId'); // Obtener ID dinámicamente
    const usuario_tipo = localStorage.getItem('userType'); // Obtener tipo de usuario
    const juego1_puntaje = this.palabrasCorrectas;
  
    if (!usuario_id || !usuario_tipo) {
      console.error('Datos de usuario no disponibles.');
      return;
    }
  
    const payload = { usuario_id, usuario_tipo, juego1_puntaje };
  
    this.apiService.guardarRespuestaBasica(payload).subscribe({
      next: () => console.log('Respuesta guardada exitosamente'),
      error: (err) => console.error('Error al guardar la respuesta:', err),
    });
  }
  
  
}
