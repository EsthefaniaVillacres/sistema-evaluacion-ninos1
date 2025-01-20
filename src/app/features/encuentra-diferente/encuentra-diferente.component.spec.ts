import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncuentraDiferenteComponent } from './encuentra-diferente.component';

describe('EncuentraDiferenteComponent', () => {
  let component: EncuentraDiferenteComponent;
  let fixture: ComponentFixture<EncuentraDiferenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EncuentraDiferenteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EncuentraDiferenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
