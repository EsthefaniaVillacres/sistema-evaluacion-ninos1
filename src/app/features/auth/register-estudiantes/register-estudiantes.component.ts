import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'; // Para notificaciones
import { ApiService } from '../../../services/api.service'; // Asegúrate de que esté configurado correctamente
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-estudiantes',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDividerModule,
    MatSnackBarModule,
  ],
  templateUrl: './register-estudiantes.component.html',
  styleUrls: ['./register-estudiantes.component.css'],
})
export class RegisterEstudiantesComponent {
  estudianteForm: FormGroup;

  constructor(private fb: FormBuilder, private apiService: ApiService, private snackBar: MatSnackBar,private router: Router) {
    this.estudianteForm = this.fb.group(
      {
        nombre: ['', Validators.required],
        apellido: ['', Validators.required],
        sexo: ['', Validators.required],
        edad: ['', Validators.required],
        escuela: ['', Validators.required],
        nivel: ['', Validators.required],
        correo: ['', [Validators.required, Validators.email]],
        contrasena: ['', [Validators.required, Validators.minLength(6)]],
        confirmarContrasena: ['', Validators.required],
      },
      { validator: this.passwordsMatch }
    );
  }

  passwordsMatch(group: FormGroup): { [key: string]: boolean } | null {
    const password = group.get('contrasena')?.value;
    const confirmPassword = group.get('confirmarContrasena')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.estudianteForm.valid) {
      const formData = {
        nombre: this.estudianteForm.value.nombre,
        apellido: this.estudianteForm.value.apellido,
        sexo: this.estudianteForm.value.sexo,
        edad: this.estudianteForm.value.edad,
        escuela: this.estudianteForm.value.escuela,
        nivel: this.estudianteForm.value.nivel,
        email: this.estudianteForm.value.correo,
        password: this.estudianteForm.value.contrasena,
        userType: 'estudiante', // Esto asegura que el backend lo registre como estudiante
      };
      console.log('Datos enviados:', formData);
      this.apiService.registerUser(formData).subscribe(
        (response) => {
          console.log('Estudiante registrado:', response);
          this.snackBar.open('Estudiante registrado exitosamente', 'Cerrar', { duration: 3000 });
          this.estudianteForm.reset();
          this.router.navigate(['/login']); // Redirigir al login
        },
        (error) => {
          console.error('Error al registrar estudiante:', error);
          const errorMessage = error.error?.message || 'Error al registrar estudiante';
          this.snackBar.open(errorMessage, 'Cerrar', { duration: 3000 });
        }
      );
    } else {
      this.snackBar.open('Por favor completa todos los campos correctamente', 'Cerrar', { duration: 3000 });
    }
  }
}
