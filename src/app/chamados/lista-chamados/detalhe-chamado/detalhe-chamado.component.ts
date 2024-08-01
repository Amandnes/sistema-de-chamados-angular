import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../data.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-detalhe-chamado',
  templateUrl: './detalhe-chamado.component.html',
  styleUrl: './detalhe-chamado.component.css'
})
export class DetalheChamadoComponent implements OnInit{
  id: any
  dado: any
  isLoad = false
  constructor(private dataService: DataService,  private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id']
      this.dataService.pegarId(this.id)
    })
    
    this.dataService.chamadoSelecionado().subscribe({
      next: (res) => this.dado = res
    })

    setTimeout(() => {
      this.isLoad = true
    }, 150)
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
