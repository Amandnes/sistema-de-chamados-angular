import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Output() logOut = new EventEmitter<boolean>
  constructor(private router: Router) {}

  buttonLogOut() {
    this.logOut.emit(false)
    location.reload()
  }
}
