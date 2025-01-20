import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ApiService } from '../../../services/api.service'; // Importar el servicio
import { Router } from '@angular/router'; // Importar Router para redirecciones

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    // Limpiar el localStorage al cargar
    localStorage.clear();
    console.log('LocalStorage limpiado');
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
  
      console.log('Datos enviados al backend:', loginData);
  
      this.apiService.loginUser(loginData).subscribe(
        (response: any) => {
          console.log('Respuesta del servidor:', response);
  
          // Verificar respuesta completa
          if (!response || !response.id || !response.userType) {
            console.error('Respuesta incompleta del servidor:', response);
            this.snackBar.open('Error: Respuesta del servidor incompleta.', 'Cerrar', { duration: 3000 });
            return;
          }
  
          // Guardar en localStorage
          localStorage.setItem('token', response.token);
          localStorage.setItem('userType', response.userType);
          localStorage.setItem('userId', response.id.toString());
          if (response.userType === 'estudiante') {
            localStorage.setItem('nivel', response.nivel || '');
          }
  
          console.log('LocalStorage actualizado:', {
            token: localStorage.getItem('token'),
            userType: localStorage.getItem('userType'),
            userId: localStorage.getItem('userId'),
            nivel: localStorage.getItem('nivel'),
          });
  
          // Redirección según el tipo de usuario
          if (response.userType === 'docente') {
            this.router.navigate(['/menu-docente']);
          } else if (response.userType === 'estudiante') {
            if (response.nivel === 'basica') {
              this.router.navigate(['/actividades-basica']);
            } else if (response.nivel === 'superior') {
              this.router.navigate(['/actividades-superior']);
            }
          }
        },
        (error) => {
          console.error('Error al iniciar sesión:', error);
          const errorMessage = error.error?.message || 'Credenciales inválidas';
          this.snackBar.open(errorMessage, 'Cerrar', { duration: 3000 });
        }
      );
    } else {
      this.snackBar.open('Por favor, completa todos los campos correctamente.', 'Cerrar', { duration: 3000 });
    }
  }
  
  
}
