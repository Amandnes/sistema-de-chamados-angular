import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, forkJoin, map, tap, throwError } from "rxjs";

@Injectable({providedIn: 'root'})
export class DataService {
    idChamado: any
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

    pegarId(id: any): Observable<any> {
        this.idChamado = id
        return id
    }

    chamadoSelecionado(): Observable<any>{
        let headers = new HttpHeaders({
            'accept': 'application/json',
            'authorization': this.token
        })
        return this.http.get<any>(this.jsonUrl + this.idChamado, {headers})
    }

    updateData(dados: any, file: File): Observable<any> {
        let headers = new HttpHeaders({
            'accept': 'application/json',
            'authorization': this.token
        })
        const formData = new FormData()
        formData.append('file', file)
        return forkJoin([
            this.http.post<any>(this.jsonUrl + 'upload', formData).pipe(
            tap(response => {
                // console.log('arquivo enviado', response, file)
            }),
            catchError(error => {
                // console.error('Erro ao enviar', error)
                return throwError(() => new Error("Erro ao enviar os dados"))
            }),
            map((jsonData: any) => {
                // console.log(jsonData)
            })),
            this.http.post<any>(this.jsonUrl, dados, {headers}).pipe(
                tap(response => {
                    // console.log("Dados enviados", response)
                }),
                catchError(error => {
                    return throwError(() => new Error("Erro ao enviar os dados"))
                })
            )
            ])

    }
}