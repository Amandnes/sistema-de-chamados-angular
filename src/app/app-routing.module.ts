import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CriarChamadosComponent } from './chamados/criar-chamados/criar-chamados.component';
import { ListaChamadosComponent } from './chamados/lista-chamados/lista-chamados.component';
import { DashboardsChamadosComponent } from './chamados/dashboards-chamados/dashboards-chamados.component';
import { DetalheChamadoComponent } from './chamados/lista-chamados/detalhe-chamado/detalhe-chamado.component';
import { LoginComponent } from './login/login.component';
import { MeusChamadosComponent } from './chamados/meus-chamados/meus-chamados.component';
import { EditarChamadoComponent } from './chamados/editar-chamado/editar-chamado.component';

const routes: Routes = [
  // { path: 'login', component: LoginComponent},
  { path: 'editar-chamado/:id', component: EditarChamadoComponent},
  { path: 'meus-chamados', component: MeusChamadosComponent },
  { path: 'novo-chamado', component: CriarChamadosComponent},
  { path: 'lista-chamados', component: ListaChamadosComponent},
  { path: 'dashboards', component: DashboardsChamadosComponent },
  { path: ':id', component: DetalheChamadoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
