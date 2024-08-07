import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-criar-chamados',
  templateUrl: './criar-chamados.component.html',
  styleUrl: './criar-chamados.component.css'
})
export class CriarChamadosComponent implements OnInit{
  isEnviado = false
  isErro = false
  formChamado: FormGroup 
  file: File = new File([], '', undefined)
  usuario: string = ''
  isFile = false
  id: number = 0
  isLoad = false

  constructor(private dataService: DataService) {
    this.formChamado = new FormGroup({})
  }

  ngOnInit() {
    this.usuario = this.dataService.setUsuario()
    this.dataService.getData().subscribe(dados => {
      this.isLoad = true
      this.id = dados.length
      this.formChamado = new FormGroup({
        assunto: new FormControl(),
        criado_por: new FormControl(this.usuario),
        descricao: new FormControl(),
        local: new FormControl(),
        anexo: new FormControl(),
        prioridade: new FormControl(),
        id: new FormControl(this.id + 1)
      })
    })
  }

  onSubmit() {
    if(this.file.name == '' || undefined) {
      this.isFile = true
    }
    this.dataService.updateData(this.formChamado.value, this.file, true, this.isFile).subscribe({
      next: (res) => {this.isEnviado = true},
      error: (err) => {this.isErro = true}
    })
  }

  onFileSelected(event: any) {
    const file:File = event.target.files[0];
    this.file = file
    this.formChamado.value.anexo = file.name
  }
}
