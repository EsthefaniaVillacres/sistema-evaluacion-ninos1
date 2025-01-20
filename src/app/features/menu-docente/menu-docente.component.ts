import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { ActividadesBasicaComponent } from "../actividades-basica/actividades-basica.component";
import { ActividadesSuperiorComponent } from "../actividades-superior/actividades-superior.component";
import { EstadisticasComponent } from "../estadisticas/estadisticas.component";

@Component({
  selector: 'app-menu-docente',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatListModule,
    MatDividerModule,
    RouterModule,
    MatIconModule,
    ActividadesBasicaComponent,
    ActividadesSuperiorComponent,
    EstadisticasComponent,
  ],
  templateUrl: './menu-docente.component.html',
  styleUrls: ['./menu-docente.component.css'],
})
export class MenuDocenteComponent implements OnInit {
  menuOpen = true;
  activeComponent: string = 'actividades-basica'; // Componente inicial por defecto
  menuItems: Array<{ label: string; route: string; icon: string }> = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    const userType = localStorage.getItem('userType');
    const nivel = localStorage.getItem('nivel');
  
    if (userType === 'docente') {
      this.menuItems = [
        { label: 'Actividades 5to a 7mo', route: '/actividades-basica', icon: 'school' },
        { label: 'Actividades 8vo a 10mo', route: '/actividades-superior', icon: 'science' },
        { label: 'Estadísticas', route: '/estadisticas', icon: 'bar_chart' },
      ];
    } else if (userType === 'estudiante' && nivel === 'basica') {
      this.menuItems = [{ label: 'Actividades 5to a 7mo', route: '/actividades-basica', icon: 'school' }];
      this.router.navigate(['/actividades-basica']);
    } else if (userType === 'estudiante' && nivel === 'superior') {
      this.menuItems = [{ label: 'Actividades 8vo a 10mo', route: '/actividades-superior', icon: 'science' }];
      this.router.navigate(['/actividades-superior']);
    }
  }
  
  navigate(route: string) {
    this.router.navigate([route]);
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  setActiveComponent(component: string) {
    this.activeComponent = component;
  }
}
