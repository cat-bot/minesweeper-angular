import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

// components
import { NavbarComponent } from './navbar/navbar.component';

// environment
import { environment } from '../environments/environment';
import { StatsComponent } from './stats/stats.component';
import { MinesweeperComponent } from './minesweeper/minesweeper.component';
import { MinesweeperGameComponent } from './minesweeper-game/minesweeper-game.component';
import { MinesweeperGameCellComponent } from './minesweeper-game-cell/minesweeper-game-cell.component';
import { InitialsTransformPipe } from './initials-transform.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    StatsComponent,
    MinesweeperComponent,
    MinesweeperGameComponent,
    MinesweeperGameCellComponent,
    InitialsTransformPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule, 
    AngularFireAuthModule, 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
