import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-final-results',
  imports: [
    CommonModule
  ],
  templateUrl: './final-results.component.html',
  styleUrls: ['./final-results.component.css'],
})
export class FinalResultsComponent {
  @Input() showFinalModal: boolean = false; // Para mostrar/ocultar el modal
  @Input() nivel: string = ''; // Nivel del jugador
  @Input() motivationalMessage: string = ''; // Mensaje motivacional
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>(); // Evento para cerrar el modal

  finalizar() {
    this.closeModal.emit(); // Emitir el evento para que el componente padre gestione la acción
  }
}
