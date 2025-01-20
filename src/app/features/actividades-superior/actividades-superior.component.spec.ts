import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadesSuperiorComponent } from './actividades-superior.component';

describe('ActividadesSuperiorComponent', () => {
  let component: ActividadesSuperiorComponent;
  let fixture: ComponentFixture<ActividadesSuperiorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActividadesSuperiorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActividadesSuperiorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
