import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DataService } from '../../data.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-editar-chamado',
  templateUrl: './editar-chamado.component.html',
  styleUrl: './editar-chamado.component.css'
})
export class EditarChamadoComponent implements OnInit{
  isEnviado = false
  isErro = false
  dados: any
  formChamado: any
  dadoChamado: any
  id: any
  isLoading: boolean = false
  file: File = new File([], '', undefined)

  constructor(private dataService: DataService, private route: ActivatedRoute) {
    setTimeout(() => {
      this.formChamado = new FormGroup({
        assunto: new FormControl(this.dadoChamado.assunto),
        descricao: new FormControl(this.dadoChamado.descricao),
        local: new FormControl(this.dadoChamado.local),
        anexo: new FormControl(''),
        prioridade: new FormControl(this.dadoChamado.prioridade)
      })
      this.isLoading = true
    }, 200)
    
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id']
      this.dataService.visualizarChamado(this.id)
    })
    this.dataService.chamadoSelecionado().subscribe({
      next: (res) => this.dadoChamado = res
    })
  }

  onSubmit() {
    this.dataService.updateData(this.formChamado.value, this.file, false).subscribe({
      next: (res) => {this.isEnviado = true},
      error: (err) => {this.isErro = true}
    })

  }

  onFileSelected(event: any) {
    const file:File = event.target.files[0];
    this.file = file
  }
}
