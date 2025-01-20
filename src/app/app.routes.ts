import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/auth/login/login.component';
import { MenuDocenteComponent } from './features/menu-docente/menu-docente.component';
import { ActividadesBasicaComponent } from './features/actividades-basica/actividades-basica.component';
import { ActividadesSuperiorComponent } from './features/actividades-superior/actividades-superior.component';
import { EstadisticasComponent } from './features/estadisticas/estadisticas.component';
import {  AtencionConcentracionComponent } from './features/atencion-concentracion/atencion-concentracion.component';
import { EncuentraDiferenteComponent } from './features/encuentra-diferente/encuentra-diferente.component'; // Importación del nuevo componente
import { PackingGameComponent } from './features/packing-game/packing-game.component'; // Nueva importación
import { MazeGameComponent } from './features/maze-game/maze-game.component';
import { MotivationGameComponent } from './features/motivation-game/motivation-game.component';


export const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent, // Página principal
  },
  {
    path: 'registro/docentes',
    loadComponent: () =>
      import('./features/auth/register-docentes/register-docentes.component').then(
        (m) => m.RegisterDocentesComponent
      ),
  },
  {
    path: 'registro/estudiantes',
    loadComponent: () =>
      import('./features/auth/register-estudiantes/register-estudiantes.component').then(
        (m) => m.RegisterEstudiantesComponent
      ),
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'menu-docente',
    loadComponent: () => import('./features/menu-docente/menu-docente.component').then(m => m.MenuDocenteComponent)
  },  
  { path: 'actividades-basica', component: ActividadesBasicaComponent },
  { path: 'actividades-superior', component: ActividadesSuperiorComponent },
  { path: 'estadisticas', component: EstadisticasComponent },
  {
    path: 'memoria-asociativa',
    loadComponent: () =>
      import('./features/memoria-asociativa/memoria-asociativa.component').then((m) => m.MemoriaAsociativaComponent),
  },
  { path: 'atencion-concentracion', component: AtencionConcentracionComponent },

  {
    path: 'encuentra-diferente', // Nueva ruta
    component: EncuentraDiferenteComponent,
  },
  {
    path: 'packing-game', // Nueva ruta
    component: PackingGameComponent,
  },
  {
    path: 'maze-game',
    component: MazeGameComponent,
  },
  {
    path: 'motivation-game',
    component: MotivationGameComponent,
  },
  
  
  
];
