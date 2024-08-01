import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { CriarChamadosComponent } from "./criar-chamados.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
    { path: 'novo-chamado', component: CriarChamadosComponent }
]
@NgModule({
    declarations: [
        CriarChamadosComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes)
    ],
    providers: []
})

export class CriarChamadosModule{}