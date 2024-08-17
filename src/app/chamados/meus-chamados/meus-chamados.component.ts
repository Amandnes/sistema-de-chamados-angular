import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-meus-chamados',
  templateUrl: './meus-chamados.component.html',
  styleUrl: './meus-chamados.component.css'
})
export class MeusChamadosComponent implements OnInit{
  isLoading: boolean = true
  dados: any
  dadosFiltrados: any
  isLoadingDados: boolean = false

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit(): void {
    this.dataService.getDataMeusChamados().subscribe({
      next: (res) => this.dados = res,
      error: (err) => console.error(err),
      complete: () => {
        this.isLoading = !this.isLoading
      }
    })
  }

  stylePrioridade(p: string) {
    if(p === 'Alta') {
      return 'stylePrioridadeAlta'
    } else if(p === 'Normal') {
      return 'stylePrioridadeNormal'
    } else {
      return 'stylePrioridadeBaixa'
    }
  }

  clickChamado(id: number, dado: any) {
    this.dataService.visualizarChamado(dado)
    this.router.navigate([`/meus-chamados/chamado/${id}`])
  }

  receberDados(dados: any) {
    this.dadosFiltrados = dados
    setTimeout(() => {
      this.isLoadingDados = true
    })
  }
}
