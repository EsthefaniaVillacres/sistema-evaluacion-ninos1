import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { FinalResultsComponent } from '../../shared/final-results/final-results.component'; // Ajusta la ruta si es diferente


@Component({
  selector: 'app-motivation-game',
  imports: [CommonModule, FinalResultsComponent],
  templateUrl: './motivation-game.component.html',
  styleUrls: ['./motivation-game.component.css'],
})
export class MotivationGameComponent {
  questions = [
    {
      question: '¿Por qué te gusta jugar juegos digitales?',
      options: [
        { text: 'Para aprender algo nuevo', value: 2 },
        { text: 'Para pasar el tiempo', value: 1 },
        { text: 'Porque me obligan', value: -2 },
      ],
    },
    {
      question: '¿Cómo te sientes después de jugar un juego digital?',
      options: [
        { text: 'Motivado y con más energía', value: 1 },
        { text: 'Igual que antes', value: 1 },
        { text: 'Cansado o frustrado', value: -1 },
      ],
    },
    {
      question: '¿Qué tipo de juegos prefieres?',
      options: [
        { text: 'Juegos educativos', value: 3 },
        { text: 'Juegos competitivos', value: 1 },
        { text: 'Juegos violentos', value: -3 },
      ],
    },
    {
      question: '¿Qué haces cuando pierdes en un juego?',
      options: [
        { text: 'Analizo y trato de mejorar', value: 2 },
        { text: 'Me enojo y dejo de jugar', value: -2 },
        { text: 'Lo ignoro y sigo jugando', value: 1 },
      ],
    },
    {
      question: '¿Qué importancia tienen los juegos digitales en tu vida?',
      options: [
        { text: 'Son una herramienta útil', value: 2 },
        { text: 'Solo los uso para divertirme', value: 1 },
        { text: 'No tienen importancia', value: -1 },
      ],
    },
  ];

  currentQuestionIndex = 0;
  currentQuestion = this.questions[this.currentQuestionIndex];
  score = 0; // Puntaje actual
  gameOver = false;
  starsEarned = 0;
  showFinalModal = false; // Para el modal final con el resultado de la BD
  motivationalMessage = '';
  stars = Array(3).fill(0); // Representa las estrellas
  nivel = '';
  totalScore = 0;
  showGameOverModal = false; 

  constructor(private router: Router, private apiService: ApiService) { }

  selectOption(option: any) {
    this.score += option.value;
    this.currentQuestionIndex++;

    if (this.currentQuestionIndex < this.questions.length) {
      this.currentQuestion = this.questions[this.currentQuestionIndex];
    } else {
      this.endGame();
    }
  }

  endGame() {
    this.gameOver = true;
  
    // Muestra el modal del juego 6
    this.showGameOverModal = true;
  
    // Obtener datos dinámicos del usuario desde localStorage
    const usuario_id = localStorage.getItem('userId'); // ID dinámico
    const usuario_tipo = localStorage.getItem('userType'); // Tipo dinámico
  
    // Validar que los datos estén disponibles
    if (!usuario_id || !usuario_tipo) {
      console.error('Datos de usuario no disponibles en localStorage.');
      return;
    }
  
    // Enviar puntaje del juego 6 al backend
    const datos = {
      usuario_id, // ID dinámico
      usuario_tipo, // Tipo dinámico
      juego6_puntaje: this.score, // Puntaje del juego 6
    };
  
    this.apiService.guardarRespuestaBasica(datos).subscribe({
      next: (response) => {
        console.log('Puntaje del juego 6 guardado con éxito:', response);
      },
      error: (error) => {
        console.error('Error al guardar el puntaje del juego 6:', error);
      },
    });
  }
  
  
  nextActivity() {
    
    this.showGameOverModal = false; // Cerrar el modal actual
  
    this.apiService.obtenerTotal().subscribe({
      next: (response: any) => {
        const totalScore = parseFloat(response.data[0]?.total_puntuacion || 0); // Ajusta el acceso a response.data
        console.log('Total Score:', totalScore);
    
        // Determinar nivel basado en el puntaje total
        if (totalScore <= 20) {
          this.nivel = 'Ahora eres un Gatito';
          this.motivationalMessage = 'Esfuerzate un poco más la próxima lo lograremos ¡Sigue así!';
        } else if (totalScore > 20 && totalScore <= 40) {
          this.nivel = 'Ahora eres un Rinoceronte';
          this.motivationalMessage = ' Casi lo logramos faltó muy poco para el nivel máximo ¡Bien hecho!';
        } else if (totalScore > 40) {
          this.nivel = 'Ahora eres Mamut';
          this.motivationalMessage = ' Haz alcanzado el nivel maximo ¡Increíble trabajo!';
        }
    
        this.showFinalModal = true; // Mostrar modal final
      },
      error: (error) => {
        console.error('Error al obtener el puntaje total:', error);
      },
    });
    
  }
  
  
  finalizarSesion() {
    // Limpiar sesión y redirigir al login
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  calculateStars() {
    if (this.score >= 8) {
      this.starsEarned = 3;
      this.motivationalMessage = '¡Excelente actitud hacia los juegos digitales!';
    } else if (this.score >= 5) {
      this.starsEarned = 2;
      this.motivationalMessage = '¡Buen trabajo! Sigue motivándote.';
    } else if (this.score >= 3) {
      this.starsEarned = 1;
      this.motivationalMessage = '¡Puedes mejorar tu actitud!';
    } else {
      this.starsEarned = 0;
      this.motivationalMessage = '¡Inténtalo de nuevo! Siempre puedes mejorar.';
    }
  }
  


}
