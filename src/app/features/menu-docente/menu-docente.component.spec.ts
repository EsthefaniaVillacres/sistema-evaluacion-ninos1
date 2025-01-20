import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuDocenteComponent } from './menu-docente.component';

describe('MenuDocenteComponent', () => {
  let component: MenuDocenteComponent;
  let fixture: ComponentFixture<MenuDocenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuDocenteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuDocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
