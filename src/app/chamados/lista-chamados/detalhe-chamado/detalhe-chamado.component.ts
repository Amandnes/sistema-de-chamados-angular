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
  linkImg = ''
  isImg: any
  isMeusChamados: boolean = false
  isLoad = false
  
  constructor(private dataService: DataService,  private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id']
      this.dataService.visualizarChamado(this.id)
    })
    if(this.router.url.slice(0,23) === '/meus-chamados/chamado/') {
      this.isMeusChamados = true
    }
    this.dataService.chamadoSelecionado().then(data => {
      this.dado = data
      this.isLoad = !this.isLoad
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

  editarChamado() {
    this.router.navigate([`/editar-chamado/${this.id}`])
  }
}
