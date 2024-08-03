import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ListaChamadosComponent } from './chamados/lista-chamados/lista-chamados.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardsChamadosComponent } from './chamados/dashboards-chamados/dashboards-chamados.component';
import { HttpClientModule } from '@angular/common/http';
import { DetalheChamadoComponent } from './chamados/lista-chamados/detalhe-chamado/detalhe-chamado.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './login/auth.service';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { MeusChamadosComponent } from './chamados/meus-chamados/meus-chamados.component';
import { EditarChamadoComponent } from './chamados/editar-chamado/editar-chamado.component';
import { CommonModule } from '@angular/common';
import { CriarChamadosComponent } from './chamados/criar-chamados/criar-chamados.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ListaChamadosComponent,
    SidebarComponent,
    DashboardsChamadosComponent,
    DetalheChamadoComponent,
    LoginComponent,
    LoadingSpinnerComponent,
    MeusChamadosComponent,
    EditarChamadoComponent,
    CriarChamadosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, 
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
