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

  constructor(private dataService: DataService) {
    this.formChamado = new FormGroup({
      assunto: new FormControl(''),
      criado_por: new FormControl(''),
      descricao: new FormControl(''),
      local: new FormControl(''),
      anexo: new FormControl(this.file.name),
      prioridade: new FormControl('')
    })
  }

  ngOnInit() {}

  onSubmit() {
    this.dataService.updateData(this.formChamado.value, this.file).subscribe({
      next: (res) => {this.isEnviado = true},
      error: (err) => {this.isErro = true}
    })
  }

  onFileSelected(event: any) {
    const file:File = event.target.files[0];
    this.file = file
  }
}
