import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CriarChamadosComponent } from './chamados/criar-chamados/criar-chamados.component';
import { ListaChamadosComponent } from './chamados/lista-chamados/lista-chamados.component';
import { DashboardsChamadosComponent } from './chamados/dashboards-chamados/dashboards-chamados.component';
import { DetalheChamadoComponent } from './chamados/lista-chamados/detalhe-chamado/detalhe-chamado.component';
// import { ChamadosComponent } from './chamados/chamados.component';

const routes: Routes = [
  { path: 'novo-chamado', component: CriarChamadosComponent },
  { path: 'lista-chamados', component: ListaChamadosComponent},
  { path: 'chamado', component: DetalheChamadoComponent},
  { path: 'dashboards', component: DashboardsChamadosComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
