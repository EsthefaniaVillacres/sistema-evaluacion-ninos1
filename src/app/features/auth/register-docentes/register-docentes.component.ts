import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'; // Importar MatSnackBar
import { ApiService } from '../../../services/api.service'; // Importar el servicio API
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-docentes',
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
  templateUrl: './register-docentes.component.html',
  styleUrls: ['./register-docentes.component.css'],
})
export class RegisterDocentesComponent {
  docenteForm: FormGroup;

  constructor(private fb: FormBuilder, private apiService: ApiService, private snackBar: MatSnackBar,private router: Router) {
    this.docenteForm = this.fb.group(
      {
        nombre: ['', Validators.required],
        apellido: ['', Validators.required],
        sexo: ['', Validators.required],
        edad: ['', Validators.required],
        experiencia: ['', Validators.required],
        nivelFormacion: ['', Validators.required],
        escuela: ['', Validators.required],
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
    if (this.docenteForm.valid) {
      const formData = {
        nombre: this.docenteForm.value.nombre,
        apellido: this.docenteForm.value.apellido,
        sexo: this.docenteForm.value.sexo,
        edad: this.docenteForm.value.edad,
        experiencia: this.docenteForm.value.experiencia,
        nivel_formacion: this.docenteForm.value.nivelFormacion,
        escuela: this.docenteForm.value.escuela,
        email: this.docenteForm.value.correo, // Cambiar a email para coincidir con el backend
        password: this.docenteForm.value.contrasena, // Cambiar a password para coincidir con el backend
        userType: 'docente',
      };

      this.apiService.registerUser(formData).subscribe(
        (response) => {
          this.snackBar.open('Docente registrado exitosamente', 'Cerrar', { duration: 3000 });
          this.docenteForm.reset(); // Limpiar el formulario
          this.router.navigate(['/login']); // Redirigir al login
        },
        (error) => {
          console.error('Error al registrar docente:', error);
          const errorMessage = error.error?.message || 'Error al registrar docente';
          this.snackBar.open(errorMessage, 'Cerrar', { duration: 3000 });
        }
      );
    } else {
      this.snackBar.open('Por favor completa todos los campos correctamente', 'Cerrar', { duration: 3000 });
    }
  }
}
