import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ChamadosComponent } from './chamados/chamados.component';
import { ListaChamadosComponent } from './chamados/lista-chamados/lista-chamados.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CriarChamadosComponent } from './chamados/criar-chamados/criar-chamados.component';
import { DashboardsChamadosComponent } from './chamados/dashboards-chamados/dashboards-chamados.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ChamadosComponent,
    ListaChamadosComponent,
    SidebarComponent,
    CriarChamadosComponent,
    DashboardsChamadosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
