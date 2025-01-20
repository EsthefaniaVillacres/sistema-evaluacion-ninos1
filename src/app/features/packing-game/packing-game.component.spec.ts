import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackingGameComponent } from './packing-game.component';

describe('PackingGameComponent', () => {
  let component: PackingGameComponent;
  let fixture: ComponentFixture<PackingGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PackingGameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PackingGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
