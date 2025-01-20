import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterEstudiantesComponent } from './register-estudiantes.component';

describe('RegisterEstudiantesComponent', () => {
  let component: RegisterEstudiantesComponent;
  let fixture: ComponentFixture<RegisterEstudiantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterEstudiantesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterEstudiantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
