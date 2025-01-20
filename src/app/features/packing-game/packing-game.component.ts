import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service'; 

@Component({
  selector: 'app-packing-game',
  imports: [CommonModule],
  templateUrl: './packing-game.component.html',
  styleUrls: ['./packing-game.component.css'],
})
export class PackingGameComponent implements OnInit {
  items = [
    { name: 'Cuaderno', isCorrect: true, imgSrc: '../../assets/cuaderno.png' },
    { name: 'Lápiz', isCorrect: true, imgSrc: '../../assets/lapiz.png' },
    { name: 'Botella de agua', isCorrect: true, imgSrc: '../../assets/agua.png' },
    { name: 'Pelota', isCorrect: false, imgSrc: '../../assets/pelota.png' },
    { name: 'Juguete', isCorrect: false, imgSrc: '../../assets/juguete.png' },
    { name: 'Libro de matemáticas', isCorrect: true, imgSrc: '../../assets/libro.png' },
    { name: 'Sandwich', isCorrect: true, imgSrc: '../../assets/torta.png' },
    { name: 'Control remoto', isCorrect: false, imgSrc: '../../assets/control.png' },
  ];
  

  backpack: string[] = [];
  attemptsLeft = 5; // Número de intentos permitidos
  feedback: string | null = null;
  score = 0;
  gameOver = false;

  // Variables para el modal
  stars = Array(3).fill(0); // Representa las 3 estrellas
  starsEarned = 0;
  motivationalMessage = '';

  constructor(private router: Router,private apiService: ApiService) {}

  ngOnInit(): void {}

  selectItem(item: any) {
    if (this.backpack.length >= 5 || this.attemptsLeft <= 0) {
      this.endGame();
      return;
    }

    this.attemptsLeft--;

    if (item.isCorrect) {
      this.backpack.push(item.name);
      this.score += 2;
    }

    if (this.backpack.length === 5 || this.attemptsLeft === 0) {
      this.endGame();
    }
  }

  endGame() {
    this.gameOver = true;
    this.calculateStars();
  
    // Obtener datos dinámicos del usuario desde localStorage
    const usuario_id = localStorage.getItem('userId'); // ID dinámico
    const usuario_tipo = localStorage.getItem('userType'); // Tipo dinámico
  
    // Validar que los datos estén disponibles
    if (!usuario_id || !usuario_tipo) {
      console.error('Datos de usuario no disponibles en localStorage.');
      return;
    }
  
    // Enviar puntaje al backend
    const datos = {
      usuario_id, // ID dinámico
      usuario_tipo, // Tipo dinámico
      juego4_puntaje: this.score, // Puntaje del Juego 4
    };
  
    this.apiService.guardarRespuestaBasica(datos).subscribe({
      next: (response) => {
        console.log('Puntaje guardado con éxito:', response);
      },
      error: (error) => {
        console.error('Error al guardar el puntaje:', error);
      },
    });
  }
  

  calculateStars() {
    if (this.score === 10) {
      this.starsEarned = 3;
      this.motivationalMessage = '¡Excelente trabajo! Empacaste todo correctamente.';
    } else if (this.score >= 7) {
      this.starsEarned = 2;
      this.motivationalMessage = '¡Muy bien hecho! Pero puedes mejorar.';
    } else if (this.score >= 4) {
      this.starsEarned = 1;
      this.motivationalMessage = '¡Buen esfuerzo! Intenta ser más preciso.';
    } else {
      this.starsEarned = 0;
      this.motivationalMessage = '¡No te rindas! Puedes mejorar la próxima vez.';
    }
  }

  nextActivity() {
    // Redirige a la siguiente actividad
    this.router.navigate(['/maze-game']);
  }
}
