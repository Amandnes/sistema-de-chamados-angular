import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, forkJoin, map, tap, throwError } from "rxjs";

@Injectable({providedIn: 'root'})
export class DataService {
    idChamadoSelecionado: any
    idUsuario: any
    token = '1dfdeb4f-0740-4271-9f29-2f24b3866369'
    idArquivoChamado = ''
    filename = ''

    private jsonUrl = 'https://backchamadoentrevista.esferasolutions.com.br/chamados/'
    
    constructor(private http: HttpClient) {}

    getData(): Observable<any> {
        let headers = new HttpHeaders({
            'accept': 'application/json',
            'authorization': this.token
        })
        return this.http.get<any>(this.jsonUrl, {headers}).pipe(
            catchError(error => {
                return throwError(() => new Error("Erro ao enviar os dados"))
            }),
            map(dados => dados)
        )
    }

    getDataUsuario(dadosUsuario: any): Observable<any> {
        let headers = new HttpHeaders({
            'accept': 'application/json',
            'authorization': this.token
        })
        return forkJoin({ 
            arrayDadosFire: this.http.get<any>(`https://sistema-de-chamados-269bd-default-rtdb.firebaseio.com/${this.idUsuario}/UsuarioChamado.json`),
            dados: this.http.get<any>(this.jsonUrl, {headers})
        }).pipe(
            catchError(error => {
                return throwError(() => new Error('Erro ao Enviar os dados'))
            }),
            map(({dados, arrayDadosFire}) => {
                let dadosArray: any[] = []
                dadosArray = Object.entries(arrayDadosFire)
                for(let i = 0; i < dadosArray.length; i++) {
                    for(let index = 0; index < dados.length; index++) {
                        if(dadosArray[i][1].idUsuario === dados[index].criado_por && dadosArray[i][1].idChamado === dados[index].id) {
                            dadosUsuario[i] = dados[index]
                        }   
                    }
                }
                return dadosUsuario
            })
        )
    }

    visualizarChamado(id: any): Observable<any> {
        this.idChamadoSelecionado = id
        return id
    }

    chamadoSelecionado(): Observable<any>{
        let headers = new HttpHeaders({
            'accept': 'application/json',
            'authorization': this.token
        })
        return this.http.get<any>(this.jsonUrl + this.idChamadoSelecionado, {headers})
    }

    updateData(dados: any, file: File, isUpadateData: boolean): Observable<any> {
        let headers = new HttpHeaders({
            'accept': 'application/json',
            'authorization': this.token
        })

        const formData = new FormData()
        formData.append('file', file)

        if(isUpadateData) {
            return forkJoin([
                this.http.post<any>(this.jsonUrl + 'upload', formData).pipe(
                tap(response => {
                    this.idArquivoChamado = response
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
        } else {
            return this.http.put<any>(this.jsonUrl + this.idChamadoSelecionado, dados, {headers}).pipe(
                    tap(response => {
                        // console.log("Dados enviados", response)
                    }),
                    catchError(error => {
                        return throwError(() => new Error("Erro ao enviar os dados"))
                    })
            )
        }
    }

    setIdArquivo(id = this.idArquivoChamado) {
        return id
    }
    
    getIdUsuario(id: any): Observable<any> {
        this.idUsuario = id
        return id
    }

    getFile() {
        let isImg = false
        let headers = new HttpHeaders({
            'accept': 'application/json',
            'authorization': this.token
        })
        return forkJoin({selecionado: this.http.get<any>(this.jsonUrl + this.idChamadoSelecionado, {headers}),
                        dadosFireBase: this.http.get<any>(`https://sistema-de-chamados-269bd-default-rtdb.firebaseio.com/${this.idUsuario}/UsuarioChamado.json`)
                    }).pipe(
                            catchError(error => {
                                return throwError(() => new Error('Erro ao Enviar os dados'))
                            }),
                            map(({dadosFireBase}) => {
                                let dadosArray: any[] = []
                                dadosArray = Object.entries(dadosFireBase)
                                for(let i = 0; i < dadosArray.length; i++) {
                                    if(dadosArray[i][1].idChamado == this.idChamadoSelecionado) {
                                            this.filename = dadosArray[i][1].arquivoChamado.filename
                                            isImg = true
                                    }
                                }
                                return [this.filename, isImg]
                            })
                    )
    }

    upadateDataFireBase(dados: any){
        return this.http.post(`https://sistema-de-chamados-269bd-default-rtdb.firebaseio.com/${this.idUsuario}/UsuarioChamado.json/`, JSON.stringify(dados)).subscribe()
    }
}