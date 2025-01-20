import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  standalone: true, // Marca el componente como standalone
  imports: [CommonModule], // Agrega CommonModule para habilitar *ngIf y otras directivas comunes
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  showHeader: boolean = true; // Inicializa la propiedad

  constructor(private router: Router) {
    // Detecta la ruta actual y oculta el encabezado si es la página principal
    this.router.events.subscribe(() => {
      this.showHeader = this.router.url !== '/'; // Cambia a `false` si la URL es la página principal
    });
  }
}
