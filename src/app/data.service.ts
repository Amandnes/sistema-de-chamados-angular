import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, forkJoin, map, tap, throwError } from "rxjs";

@Injectable({providedIn: 'root'})
export class DataService {
    dadosChamadoSelecionado: any
    idUsuario: any
    emailUsuario = ''
    todosDados: any
    outrosDados: any
    codChamado: string = ''

    private jsonUrl = 'https://sistema-de-chamado-secundario-default-rtdb.firebaseio.com/data'
    
    constructor(private http: HttpClient) {}

    // Retorna todos os chamados
    getData(): Observable<any> {
        let arrayTodosChamados: any = []
        return this.http.get<any>(`${this.jsonUrl}.json`).pipe(
            catchError(error => {
                return throwError(() => new Error("Erro ao enviar os dados"))
            }),
            map(dados => {
                this.todosDados = Object.entries(dados)
                for(let i = 0; i < this.todosDados.length; i++) {
                    this.outrosDados = Object.entries(this.todosDados[i][1].UsuarioChamado)
                    for(let j = 0; j < this.outrosDados.length; j++) {
                        arrayTodosChamados.push(this.outrosDados[j])
                    }
                }
                arrayTodosChamados.sort((a:any, b:any) => {
                    if(a[1].id < b[1].id) 
                      return 1
                    if(a[1].id > b[1].id)
                      return -1
                    return 0
                })
                return arrayTodosChamados
            })
        )
    }

    //Retorna somente os Chamados do Usuário logado
    getDataMeusChamados() {
        let arrayMeusChamados: any[] = []
        return this.http.get<any>(`${this.jsonUrl}/${this.idUsuario}/UsuarioChamado.json`).pipe(
            catchError(error => {
                return throwError(() => new Error("Erro ao enviar os dados"))
            }),
            map(dados => {
                this.outrosDados = Object.entries(dados)
                for(let i = 0; i < this.outrosDados.length; i++) {
                    arrayMeusChamados.push(this.outrosDados[i]) 
                }
                arrayMeusChamados.sort((a:any, b:any) => {
                    if(a[1].id < b[1].id) 
                      return 1
                    if(a[1].id > b[1].id)
                      return -1
                    return 0
                  })
                return arrayMeusChamados
            })
        )
    }

    visualizarChamado(dado: any): Observable<any> {
        this.dadosChamadoSelecionado = dado[1]
        this.codChamado = dado[0]
        return dado
    }

    chamadoSelecionado() {
        return this.dadosChamadoSelecionado
    }

    updateData(dados: any, file: File, isUpadateData: boolean, isFile: boolean): Observable<any> {
        const formData = new FormData()
        formData.append('file', file)
        
        if(isUpadateData) {
            return this.http.post<any>(`${this.jsonUrl}/${this.idUsuario}/UsuarioChamado.json`, JSON.stringify(dados)).pipe(
                    tap(response => {
                        // console.log("Dados enviados", response)
                    }),
                    catchError(error => {
                        return throwError(() => new Error("Erro ao enviar os dados"))
                    })
                )
            
        } else {
            return this.http.put<any>(`${this.jsonUrl}/${this.idUsuario}/UsuarioChamado/${this.codChamado}.json`, dados).pipe(
                    tap(response => {
                        // console.log("Dados enviados", response)
                    }),
                    catchError(error => {
                        return throwError(() => new Error("Erro ao enviar os dados"))
                    })
            )
        }
    }
    
    getIdUsuario(id: any): Observable<any> {
        this.idUsuario = id
        return id
    }

    setUsuario(id = this.emailUsuario) {
        return id
    }

    getUsuario(usuario: any): Observable<any> {
        this.emailUsuario = usuario
        return usuario
    }
}