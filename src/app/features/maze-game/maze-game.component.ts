import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../../services/api.service'; // Importar el servicio API

@Component({
  selector: 'app-maze-game',
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './maze-game.component.html',
  styleUrls: ['./maze-game.component.css'],
})
export class MazeGameComponent {
  attemptsLeft = 2;
  progress = 0; // 5 pasos necesarios para ganar
  score = 0; // Puntaje máximo de 10
  gameOver = false;
  endMessage = '';
  starsEarned = 0;

  // Ícono del personaje
  characterIcon = faUser;

  // Posición inicial del personaje (ajustada al honguito de la esquina inferior izquierda)
  characterPosition = { x: 10, y: 50 }; // Empieza en el honguito inferior izquierdo

  // Opciones de caminos
  correctPath = ['right', 'down', 'down', 'right', 'right', 'straight', 'straight', 'right', 'right', 'straight', 'straight', 'right', 'right', 'down', 'down', 'right']; // Secuencia correcta

  // Variables para el modal
  stars = Array(3).fill(0);

  constructor(private router: Router, private apiService: ApiService) { }

  makeChoice(choice: string) {
    if (this.gameOver) return;

    // Verifica si la elección es correcta
    if (choice === this.correctPath[this.progress]) {
      this.progress++;
      this.score += 0.625; // Sumar puntos por paso correcto
      this.moveCharacter(choice);
    } else {
      this.attemptsLeft--;
    }

    // Verifica condiciones de fin del juego
    if (this.progress === this.correctPath.length) {
      this.endMessage = '¡Felicidades, llegaste a la salida!';
      this.endGame();
    } else if (this.attemptsLeft === 0) {
      this.endMessage = '¡Oh no, te quedaste sin intentos!';
      this.endGame();
    }
  }

  moveCharacter(direction: string) {
    if (direction === 'left') {
      this.characterPosition.x -= 10; // Mueve a la izquierda
    } else if (direction === 'straight') {
      this.characterPosition.y -= 10; // Mueve hacia arriba
    } else if (direction === 'right') {
      this.characterPosition.x += 10; // Mueve a la derecha
    } else if (direction === 'down') {
      this.characterPosition.y += 10; // Mueve hacia abajo
    }

    // Asegúrate de que no salga del laberinto
    this.characterPosition.x = Math.min(100, Math.max(0, this.characterPosition.x));
    this.characterPosition.y = Math.min(100, Math.max(0, this.characterPosition.y));
  }

  endGame() {
    this.gameOver = true;
    this.calculateStars();
  
    // Obtener datos del usuario desde localStorage
    const usuario_id = localStorage.getItem('userId'); // Obtener el ID dinámico
    const usuario_tipo = localStorage.getItem('userType'); // Obtener el tipo dinámico
  
    if (!usuario_id || !usuario_tipo) {
      console.error('Datos de usuario no disponibles en localStorage.');
      return;
    }
  
    // Enviar puntaje al backend
    const datos = {
      usuario_id, // ID dinámico
      usuario_tipo, // Tipo dinámico
      juego5_puntaje: this.score, // Puntaje del Juego 5
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
    if (this.score >= 10) {
      this.starsEarned = 3;
    } else if (this.score >= 7) {
      this.starsEarned = 2;
    } else if (this.score >= 4) {
      this.starsEarned = 1;
    } else {
      this.starsEarned = 0;
    }
  }

  nextActivity() {
    this.router.navigate(['/motivation-game']); // Cambia a la siguiente actividad
  }
}
