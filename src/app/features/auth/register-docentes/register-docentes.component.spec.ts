import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterDocentesComponent } from './register-docentes.component';

describe('RegisterDocentesComponent', () => {
  let component: RegisterDocentesComponent;
  let fixture: ComponentFixture<RegisterDocentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterDocentesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterDocentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
