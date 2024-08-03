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

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit(): void {
    this.dataService.getDataUsuario([]).subscribe({
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

  clickChamado(dado: number) {
    this.dataService.visualizarChamado(dado)
    this.router.navigate([`/${dado}`])
  }
}
