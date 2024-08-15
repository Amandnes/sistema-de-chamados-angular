import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, forkJoin, map, tap, throwError } from "rxjs";

@Injectable({providedIn: 'root'})
export class DataService {
    idChamadoSelecionado: any
    idUsuario: any
    dado: any
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
                        arrayTodosChamados.push(this.outrosDados[j][1])
                        console.log(this.outrosDados[j])
                    }
                }
                return arrayTodosChamados
            })
        )
    }

    //Retorna somente os Chamados do Usuário logado
    getDataMeusChamados() {
        let arrayMeusChamados: any[] = []
        let codigoChamados: any = []
        return this.http.get<any>(`${this.jsonUrl}/${this.idUsuario}/UsuarioChamado.json`).pipe(
            catchError(error => {
                return throwError(() => new Error("Erro ao enviar os dados"))
            }),
            map(dados => {
                this.outrosDados = Object.entries(dados)
                for(let i = 0; i < this.outrosDados.length; i++) {
                    codigoChamados.push(this.outrosDados[i][0])
                    arrayMeusChamados.push(this.outrosDados[i][1]) 
                }
                return [arrayMeusChamados, codigoChamados]
            })
        )
    }

    visualizarChamado(id: any): Observable<any> {
        this.idChamadoSelecionado = id
        return id
    }

    codigoChamado(codChamado: string) {
        this.codChamado = codChamado
    }

    chamadoSelecionado(): Promise<any> {
        return new Promise((resolve) => {
            this.getData().subscribe({
                next: (res) => {
                    this.dado = res
                }, complete: () => {
                    for(let i = 0; i < this.dado.length; i++) {
                        if(this.idChamadoSelecionado == this.dado[i].id) {
                          this.dado = this.dado[i]
                          break
                        }
                    }
                    resolve(this.dado)
                }
            })
        }) 
      
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

    // setIdArquivo(id = this.idArquivoChamado) {
    //     return id
    // }
    
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