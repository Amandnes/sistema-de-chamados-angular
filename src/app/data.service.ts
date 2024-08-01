import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, tap, throwError } from "rxjs";

@Injectable({providedIn: 'root'})
export class DataService {
    token = '1dfdeb4f-0740-4271-9f29-2f24b3866369'
    private jsonUrl = 'https://backchamadoentrevista.esferasolutions.com.br/chamados/'

    constructor(private http: HttpClient) {}

    getData(): Observable<any> {
        let headers = new HttpHeaders({
            'accept': 'application/json',
            'authorization': this.token
        })
        return this.http.get<any>(this.jsonUrl, {headers})
    }

    updateData(dados: any) {
        console.log(JSON.stringify(dados))
        let headers = new HttpHeaders({
            'content-type': 'application/json',
            'authorization': `Bearer ${this.token}`
            })
        return this.http.post<any>(this.jsonUrl, JSON.stringify(dados), {headers}).pipe(
            tap(response => console.log("Dados enviados", response)),
            catchError(error => {
                console.error('Erro ao enviar', error)
                return throwError(() => new Error("Erro ao enviar os dados"))
            })
        )
    }
}