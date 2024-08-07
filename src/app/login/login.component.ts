import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthResponseData, AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  @Output() login = new EventEmitter<any>
  formLogin: FormGroup
  isLogin: boolean = false
  isErro: boolean = false
  isLoading: boolean = false

  constructor(private authService: AuthService, private router: Router, private dataService: DataService) {
    this.formLogin = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })
    
  }
  ngOnInit(): void {
  }

  onSubmit(): void {
    this.isLoading = !this.isLoading
    let authObs: Observable<AuthResponseData>
    authObs = this.authService.login(this.formLogin.value.email, this.formLogin.value.password)
    
    authObs.subscribe(
      resData => {
        this.router.navigate(['/'])
        this.isLogin = true
        this.login.emit(true)
        this.dataService.getIdUsuario(resData.localId)
        this.dataService.getUsuario(resData.email)
        this.isLoading = !this.isLoading
      },
      errorMessage => {
        this.isErro = true
        this.isLoading = !this.isLoading
      }
    )
  }

}
