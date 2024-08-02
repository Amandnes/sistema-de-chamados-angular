import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject, catchError, tap, throwError } from "rxjs";
import { User } from "./user.model";

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {
    user = new Subject<User>()

    constructor(private http: HttpClient) {}
    
    login(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDomm_dxnROnW04A0hQPpt8JyY6kh5YNVA',
            {email: email, password: password, returnSecureToken: true}
        ).pipe(
            catchError(this.handleError),
            tap(resData => {
              this.handleAuthentication(
                resData.email,
                resData.localId,
                resData.idToken,
                +resData.expiresIn
              )
            })
          )
        
    }

    private handleAuthentication(
        email: string,
        userId: string,
        token: string,
        expiresIn: number
      ) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000)
        const user = new User(email, userId, token, expirationDate)
        this.user.next(user)
      }
    
    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'Ocorreu um erro!'
        if (!errorRes.error || !errorRes.error.error) {
          return throwError(errorMessage)
        }
        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'This email exists already'
                break
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'This email does not exist.'
                break
            case 'INVALID_PASSWORD':
                errorMessage = 'This password is not correct.'
                break
            case 'INVALID_EMAIL':
                errorMessage = 'Email inválido'
                break
        }
        return throwError(errorMessage)
      }
}