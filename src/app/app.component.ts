import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  logado: any

  constructor() {}

  login(log: boolean) {
    this.logado = log
  }
  logOut(log: boolean) {
    this.logado = log
  }
}
