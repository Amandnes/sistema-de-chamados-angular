import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-lista-chamados',
  templateUrl: './lista-chamados.component.html',
  styleUrl: './lista-chamados.component.css'
})
export class ListaChamadosComponent implements OnInit{
  dados: any
  dadosFireBase: any
  isLoading: boolean = true
  dadosFiltrados: any
  isLoadingDados: boolean = false

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit() {
    this.dataService.getData().subscribe({
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
    this.router.navigate([`/lista-chamados/chamado/${id}`])
  }

  receberDados(dados: any) {
    this.dadosFiltrados = dados
    setTimeout(() => {
      this.isLoadingDados = true
    })
  }
}
