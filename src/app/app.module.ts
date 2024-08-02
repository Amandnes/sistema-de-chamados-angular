import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ListaChamadosComponent } from './chamados/lista-chamados/lista-chamados.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardsChamadosComponent } from './chamados/dashboards-chamados/dashboards-chamados.component';
import { CriarChamadosModule } from './chamados/criar-chamados/criar-chamados.module';
import { DataService } from './data.service';
import { HttpClientModule } from '@angular/common/http';
import { DetalheChamadoComponent } from './chamados/lista-chamados/detalhe-chamado/detalhe-chamado.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ListaChamadosComponent,
    SidebarComponent,
    DashboardsChamadosComponent,
    DetalheChamadoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CriarChamadosModule,
    HttpClientModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
