import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ChamadosComponent } from './chamados/chamados.component';
import { ListaChamadosComponent } from './chamados/lista-chamados/lista-chamados.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardsChamadosComponent } from './chamados/dashboards-chamados/dashboards-chamados.component';
import { CriarChamadosModule } from './chamados/criar-chamados/criar-chamados.module';
import { DataService } from './data.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ChamadosComponent,
    ListaChamadosComponent,
    SidebarComponent,
    DashboardsChamadosComponent
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
