import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

// Tipo para las opciones de preguntas
type QuestionOption =
  | string // Para preguntas sin puntuación
  | { text: string; value: number }; // Para preguntas con puntuación

// Interface para las preguntas
interface Question {
  question: string;
  options: QuestionOption[];
  type: 'text' | 'score';
}

@Component({
  selector: 'app-actividades-superior',
  imports: [CommonModule],
  templateUrl: './actividades-superior.component.html',
  styleUrls: ['./actividades-superior.component.css']
})

export class ActividadesSuperiorComponent {
  showFinalModal = false; // Controla la visibilidad del segundo modal
  showGameOverModal = false; // Controla la visibilidad del modal de juego terminado
  nivel: string = ''; // Almacena el nivel alcanzado
  motivationalMessage: string = ''; // Almacena el mensaje motivacional
  // Declaración de las preguntas con el tipo Question
  questions: Question[] = [
    // Preguntas sin puntuación
    { question: '¿Qué juegos conoces?', options: ['Garena Free Fire', 'Roblox', 'Duolingo'], type: 'text' },
    { question: '¿Cuántas horas juegas al día?', options: ['1h a 2h', '2h a 4h', '4h a 6h', 'Más de 7h'], type: 'text' },
    { question: '¿Cuando juegas lo haces en equipo o individual?', options: ['Siempre', 'Casi siempre', 'Algunas veces', 'Rara vez', 'Nunca'], type: 'text' },
    { question: '¿Al utilizar uno de los juegos que mencionaste, esto permite que te relaciones con tus compañeros?', options: ['No, juego solo', 'Sí, juego en equipo'], type: 'text' },

    // Preguntas con puntuación
    { question: '¿De qué manera el juego te ha motivado a aprender cosas nuevas ?', options: [{ text: 'Feliz', value: 10 }, { text: 'Serio', value: 6 }, { text: 'Triste', value: 3 }], type: 'score' },
    { question: '¿Cuándo pierdes un juego, cómo te sientes?', options: [{ text: 'Triste', value: 3 }, { text: 'Feliz', value: 6 }, { text: 'Serio', value: 10 }], type: 'score' },
    { question: '¿Con qué juego aprendes más?', options: [{ text: 'Duolingo', value: 10 }, { text: 'Roblox', value: 6 }, { text: 'Clash Royale', value: 3 }], type: 'score' },
    { question: '¿Qué juego llama más tu atención?', options: [{ text: 'Rayuela', value: 2 }, { text: 'Uno', value: 2 }, { text: 'Jenga', value: 2 }, { text: 'Fútbol móvil', value: 2 }, { text: 'Roblox', value: 2 }], type: 'score' },
    { question: '¿Sientes que estos juegos han sido útiles para mejorar tu atención en clase?', options: [{ text: 'Sí', value: 10 }, { text: 'Más o menos', value: 6 }, { text: 'No', value: 3 }], type: 'score' }
  ];

  responses: any[] = []; // Array para almacenar las respuestas
  currentQuestionIndex = 0; // Índice de la pregunta actual
  totalScore = 0; // Puntaje total

  constructor(private router: Router, private apiService: ApiService) { }

  selectOption(option: QuestionOption, index: number) {
    if (this.questions[index].type === 'score' && this.isScoreOption(option)) {
      // Si es una pregunta con puntuación, almacena el valor
      this.responses[index] = option.value;
      this.totalScore += option.value; // Suma el puntaje al total
    } else {
      // Si es una pregunta sin puntuación, almacena el texto
      this.responses[index] = option;
    }
    console.log('Respuestas actuales:', this.responses);
    this.currentQuestionIndex++;
  }

  showLevelModal = false; // Controla la visibilidad del modal
  level: string = ''; // Almacena el nivel del estudiante



  saveResponses() {
    const usuario_id = localStorage.getItem('userId'); // Obtener el ID dinámico
    const usuario_tipo = localStorage.getItem('userType'); // Obtener el tipo dinámico
  
    if (!usuario_id || !usuario_tipo) {
      console.error('Datos de usuario no disponibles en localStorage.');
      return;
    }
  
    const data = {
      usuario_id, // ID dinámico
      usuario_tipo, // Tipo dinámico
      juego1_respuesta: this.responses[0] || null,
      juego2_respuesta: this.responses[1] || null,
      juego3_respuesta: this.responses[2] || null,
      juego4_respuesta: this.responses[3] || null,
      juego5_puntaje: Number(this.responses[4]) || 0,
      juego6_puntaje: Number(this.responses[5]) || 0,
      juego7_puntaje: Number(this.responses[6]) || 0,
      juego8_puntaje: Number(this.responses[7]) || 0,
      juego9_puntaje: Number(this.responses[8]) || 0,
    };
  
    this.apiService.guardarRespuestasSuperior(data).subscribe({
      next: () => {
        // Calcular el nivel basado en el puntaje total
        this.totalScore =
          data.juego5_puntaje +
          data.juego6_puntaje +
          data.juego7_puntaje +
          data.juego8_puntaje +
          data.juego9_puntaje;
  
        if (this.totalScore <= 14) {
          this.nivel = 'Nivel Villano';
          this.motivationalMessage = 'Esfuérzate un poco más la próxima vez. ¡Sigue así!';
        } else if (this.totalScore > 15 && this.totalScore <= 28) {
          this.nivel = 'Nivel Mago';
          this.motivationalMessage = 'Casi logramos llegar al nivel más alto. ¡Bien hecho!';
        } else if (this.totalScore > 29) {
          this.nivel = 'Nivel Heroe';
          this.motivationalMessage = '¡Haz alcanzado el nivel máximo! ¡Increíble trabajo!';
        }
  
        // Mostrar el modal
        this.showGameOverModal = true;
      },
      error: (err) => console.error('Error al guardar las respuestas:', err),
    });
  }
  
  

  isScoreOption(option: QuestionOption): option is { text: string; value: number } {
    return typeof option === 'object' && 'text' in option && 'value' in option;
  }
  determineLevel(totalScore: number): string {
    if (totalScore <= 14) {
      return 'Principiante';
    } else if (totalScore <= 28) {
      return 'Avanzado';
    } else {
      return 'Profesional';
    }
  }
  closeLevelModal() {
    this.showLevelModal = false;
    this.showFinalModal = true; // Muestra el modal final
  }
  finalizarSesion() {
    // Limpiar sesión y redirigir al login
    localStorage.clear();
    this.router.navigate(['/login']);
  }
  getDimensionTitle(index: number): string {
    if (index < 2) return 'Dimensión Informativa';
    if (index < 4) return 'Dimensión Social';
    if (index < 6) return 'Dimensión Afectiva';
    return 'Dimensión Final';
  }
  nextActivity() {
    this.apiService.obtenerTotal().subscribe({
      next: (response: any) => {
        const totalScore = parseFloat(response.data[0]?.total_puntuacion || '0');
        console.log('Total Score:', totalScore);
  
        if (totalScore <= 14) {
          this.nivel = 'Nivel Villano';
          this.motivationalMessage = 'Esfuérzate un poco más la próxima vez. ¡Sigue así!';
        } else if (totalScore > 15 && totalScore <= 28) {
          this.nivel = 'Nivel Mago';
          this.motivationalMessage = 'Casi lo logramos. ¡Bien hecho!';
        } else if (totalScore > 29 ) {
          this.nivel = 'Nivel Heroe';
          this.motivationalMessage = '¡Haz alcanzado el nivel máximo! ¡Increíble trabajo!';
        } 
  
        this.showGameOverModal = true;
      },
      error: (error) => {
        console.error('Error al obtener el puntaje total:', error);
      },
    });
  }
  
}
