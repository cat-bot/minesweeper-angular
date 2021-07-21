import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import firebase from "firebase/app";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public authService:AuthenticationService) { }

  ngOnInit(): void {
  }

  onSignIn(): void {
    this.authService.triggerLogin();
  }

  onSignOut(): void {
    this.authService.triggerLogout();
  }
}
