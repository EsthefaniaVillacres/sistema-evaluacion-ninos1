import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadesBasicaComponent } from './actividades-basica.component';

describe('ActividadesBasicaComponent', () => {
  let component: ActividadesBasicaComponent;
  let fixture: ComponentFixture<ActividadesBasicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActividadesBasicaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActividadesBasicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
