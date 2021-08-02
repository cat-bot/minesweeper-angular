import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatsComponent } from './stats/stats.component';
import { MinesweeperComponent } from './minesweeper/minesweeper.component';

const routes: Routes = [
  { path: '', component: MinesweeperComponent },
  { path: 'stats/:f', component: StatsComponent },
  { path: 'stats', redirectTo: '/stats/all'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
