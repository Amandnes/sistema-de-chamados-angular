import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-criar-chamados',
  templateUrl: './criar-chamados.component.html',
  styleUrl: './criar-chamados.component.css'
})
export class CriarChamadosComponent implements OnInit{
  dados: any
  formChamado: FormGroup

  constructor(private dataService: DataService) {
    this.formChamado = new FormGroup({
      assunto: new FormControl(''),
      // criado_em: new FormControl(new Date),
      criado_por: new FormControl(''),
      descricao: new FormControl(''),
      local: new FormControl(''),
      anexo: new FormControl(''),
      prioridade: new FormControl('')
    })
  }

  ngOnInit() {
    this.dataService.getData().subscribe(dado => {
      this.dados = dado
    })
  }

  onSubmit() {
    console.log(this.formChamado, 'teste')

  }
  click() {
    this.dados.splice(0, 1, this.formChamado.value, this.dados[0])
    this.dataService.updateData(this.dados)
  }
}
