import { Component } from '@angular/core';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { RouterOutlet } from '@angular/router';
import { initializeApp } from "firebase/app";
import { firebaseConfig } from '../firebaseConfig';
@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [ NavbarComponent, RouterOutlet]
})
export class AppComponent {
  constructor (){
    initializeApp(firebaseConfig);
  }
}
