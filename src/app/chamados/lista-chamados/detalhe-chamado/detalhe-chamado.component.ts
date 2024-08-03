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
  dadosFireBase: any
  linkImg = 'https://backchamadoentrevista.esferasolutions.com.br/chamados/download/'
  isImg: any
  
  isLoad = false
  constructor(private dataService: DataService,  private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id']
      this.dataService.visualizarChamado(this.id)
    })
    this.dataService.chamadoSelecionado().subscribe({
      next: (res) => this.dado = res,
      complete: () => this.isLoad = true
    })

    this.dataService.getFile().subscribe({
      next: (res) => {
        this.isImg = res[1]
        if(res[1] == true) {
          this.linkImg += res[0]
        }
      },
      error: (err) => console.error(err)
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
