import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../data.service';

@Component({
  selector: 'app-detalhe-chamado',
  templateUrl: './detalhe-chamado.component.html',
  styleUrl: './detalhe-chamado.component.css'
})
export class DetalheChamadoComponent implements OnInit{
  dado: any
  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.chamadoSelecionado().subscribe({
      next: (res) => this.dado = res
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
}
