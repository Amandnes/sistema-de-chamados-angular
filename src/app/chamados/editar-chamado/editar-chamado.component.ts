import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DataService } from '../../data.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-editar-chamado',
  templateUrl: './editar-chamado.component.html',
  styleUrl: './editar-chamado.component.css'
})
export class EditarChamadoComponent {
  isEnviado = false
  isErro = false
  nomeArquivo: any
  formChamado: any
  dadoChamado: any
  id: any
  isLoading: boolean = false
  file: File = new File([], '', undefined)
  isFile = false
  nomeImg: any

  constructor(private dataService: DataService, private route: ActivatedRoute) {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id']
      this.dadoChamado = this.dataService.chamadoSelecionado()
      this.formChamado = new FormGroup({
        assunto: new FormControl(this.dadoChamado.assunto),
        criado_por: new FormControl(this.dataService.setUsuario()),
        descricao: new FormControl(this.dadoChamado.descricao),
        local: new FormControl(this.dadoChamado.local),
        id: new FormControl(parseInt(this.id)),
        anexo: new FormControl(),
        prioridade: new FormControl(this.dadoChamado.prioridade)
      })
      this.isLoading = true
    })
    
  }

  onSubmit() {
    if(this.file.name === '') {
      this.isFile = true
    }
    this.dataService.updateData(this.formChamado.value, this.file, false, this.isFile).subscribe({
      next: (res) => {this.isEnviado = true},
      error: (err) => {this.isErro = true}
    })
  }

  onFileSelected(event: any) {
    const file:File = event.target.files[0];
    this.file = file
  }
}
