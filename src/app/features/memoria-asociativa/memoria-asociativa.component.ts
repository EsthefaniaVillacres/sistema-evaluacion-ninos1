import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-memoria-asociativa',
  imports:[CommonModule,MatIconModule],
  templateUrl: './memoria-asociativa.component.html',
  styleUrls: ['./memoria-asociativa.component.css'],
})
export class MemoriaAsociativaComponent implements OnInit {
  tarjetas: any[] = [];
  seleccionadas: number[] = [];
  puntaje: number = 0;
  tiempoRestante: number = 30;
  cronometroInterval: any;
  juegoTerminado: boolean = false;
  mensajeResultado: string = '';
  estrellas: string[] = [];


  iconos: string[] = [
    'home', 'favorite', 'star', 'face', 'pets',
    'home', 'favorite', 'star', 'face', 'pets',
  ];

  constructor(private router: Router,private apiService: ApiService) {}

  ngOnInit() {
    this.iniciarJuego();
  }

  iniciarJuego() {
    this.juegoTerminado = false;
    this.puntaje = 0;
    this.tiempoRestante = 30;

    // Baraja las tarjetas
    this.tarjetas = this.iconos
      .map((icono) => ({ icono, volteada: false, encontrada: false }))
      .sort(() => Math.random() - 0.5);

    this.iniciarCronometro();
  }

  iniciarCronometro() {
    this.cronometroInterval = setInterval(() => {
      if (this.tiempoRestante > 0) {
        this.tiempoRestante--;
      } else {
        clearInterval(this.cronometroInterval);
        this.finalizarJuego(); // Finaliza el juego automáticamente si el tiempo se agota
      }
    }, 1000);
  }
  
  voltearTarjeta(index: number) {
    const tarjeta = this.tarjetas[index];
    if (tarjeta.volteada || tarjeta.encontrada || this.seleccionadas.length === 2) {
      return;
    }

    tarjeta.volteada = true;
    this.seleccionadas.push(index);

    if (this.seleccionadas.length === 2) {
      this.verificarPareja();
    }
  }

  verificarPareja() {
    const [index1, index2] = this.seleccionadas;
    const tarjeta1 = this.tarjetas[index1];
    const tarjeta2 = this.tarjetas[index2];
  
    if (tarjeta1.icono === tarjeta2.icono) {
      tarjeta1.encontrada = true;
      tarjeta2.encontrada = true;
      this.puntaje += 2;
  
      // Si todas las tarjetas han sido encontradas, finaliza el juego
      if (this.tarjetas.every(t => t.encontrada)) {
        this.finalizarJuego();
      }
    } else {
      setTimeout(() => {
        tarjeta1.volteada = false;
        tarjeta2.volteada = false;
      }, 1000);
    }
  
    this.seleccionadas = [];
  }
  
  

  finalizarJuego() {
    this.juegoTerminado = true; // Indica que el juego terminó
    clearInterval(this.cronometroInterval); // Detén el cronómetro
  
    // Calcular las estrellas y el mensaje basado en el puntaje
    const resultado = this.calcularEstrellas();
    this.mensajeResultado = resultado.mensaje;
    this.estrellas = resultado.estrellas;
  
    // Mostrar el modal
    const modal = document.querySelector('.modal');
    if (modal) modal.classList.add('visible');
  
    // Guardar el resultado en la base de datos
    this.guardarResultado();
  }
  
  

  guardarResultado() {
    // Obtener datos dinámicos del usuario desde localStorage
    const usuario_id = localStorage.getItem('userId'); // ID dinámico
    const usuario_tipo = localStorage.getItem('userType'); // Tipo dinámico
  
    // Validar que los datos estén disponibles
    if (!usuario_id || !usuario_tipo) {
      console.error('Datos de usuario no disponibles en localStorage.');
      return;
    }
  
    // Construir el objeto de datos
    const datos = {
      usuario_id, // ID dinámico
      usuario_tipo, // Tipo dinámico
      juego2_puntaje: this.puntaje,
    };
  
    // Enviar el puntaje al backend
    this.apiService.guardarRespuestaBasica(datos).subscribe({
      next: () => console.log('Puntaje guardado correctamente'),
      error: (err) => console.error('Error al guardar el puntaje:', err),
    });
  }
  
  
  calcularEstrellas() {
    if (this.puntaje <= 4) {
      return { mensaje: '¡Puedes mejorar!', estrellas: ['star'] };
    } else if (this.puntaje <= 8) {
      return { mensaje: '¡Muy bien!', estrellas: ['star', 'star'] };
    } else {
      return { mensaje: '¡Excelente!', estrellas: ['star', 'star', 'star'] };
    }
  }
  

  irSiguienteActividad() {
    this.router.navigate(['/encuentra-diferente']); // Cambia '/ruta-siguiente' por la ruta real de la siguiente actividad
  }
  
}
