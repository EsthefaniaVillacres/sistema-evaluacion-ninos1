import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotivationGameComponent } from './motivation-game.component';

describe('MotivationGameComponent', () => {
  let component: MotivationGameComponent;
  let fixture: ComponentFixture<MotivationGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MotivationGameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MotivationGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
