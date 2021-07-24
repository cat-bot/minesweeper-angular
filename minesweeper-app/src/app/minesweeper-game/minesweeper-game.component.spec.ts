import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinesweeperGameComponent } from './minesweeper-game.component';

describe('MinesweeperGameComponent', () => {
  let component: MinesweeperGameComponent;
  let fixture: ComponentFixture<MinesweeperGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinesweeperGameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MinesweeperGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
