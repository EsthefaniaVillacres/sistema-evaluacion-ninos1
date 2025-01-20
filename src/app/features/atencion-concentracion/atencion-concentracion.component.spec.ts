import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtencionConcentracionComponent } from './atencion-concentracion.component';

describe('AtencionConcentracionComponent', () => {
  let component: AtencionConcentracionComponent;
  let fixture: ComponentFixture<AtencionConcentracionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtencionConcentracionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtencionConcentracionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
