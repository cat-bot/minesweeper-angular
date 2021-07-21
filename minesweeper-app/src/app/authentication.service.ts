import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from "firebase/app";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  userData: Observable<firebase.User | null>;

  constructor(private angularFireAuth: AngularFireAuth) { 
    this.userData = angularFireAuth.authState;  
  }

  triggerLogin(): void {
    let googleLoginProvider = new firebase.auth.GoogleAuthProvider();
    googleLoginProvider.addScope('https://www.googleapis.com/auth/userinfo.profile');
    googleLoginProvider.setCustomParameters({ 'login_hint': 'user@example.com' }); 

    this.angularFireAuth
      .signInWithPopup(googleLoginProvider)
      .then(res => {
        console.log('Successfully signed in!');
      })
      .catch(err => {
        console.log('Something is wrong:',err.message);
      });
  }

  triggerLogout(): void {
    this.angularFireAuth.signOut();
  }
}
