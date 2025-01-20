import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemoriaAsociativaComponent } from './memoria-asociativa.component';

describe('MemoriaAsociativaComponent', () => {
  let component: MemoriaAsociativaComponent;
  let fixture: ComponentFixture<MemoriaAsociativaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemoriaAsociativaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemoriaAsociativaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
