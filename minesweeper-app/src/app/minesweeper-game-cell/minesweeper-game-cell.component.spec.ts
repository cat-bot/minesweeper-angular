import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinesweeperGameCellComponent } from './minesweeper-game-cell.component';

describe('MinesweeperGameCellComponent', () => {
  let component: MinesweeperGameCellComponent;
  let fixture: ComponentFixture<MinesweeperGameCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinesweeperGameCellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MinesweeperGameCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
