import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.componen';
import { FooterComponent } from './footer/footer.Component';
import { ClientesComponent } from './clientes/clientes.component';
import { ClienteService } from './clientes/cliente.service';
import { RouterModule, Routes } from '@angular/router';
import { ImcNinosComponent } from './imc-ninos/imc-ninos.component';
import { ImcninoService } from './imc-ninos/imcnino.service';
import { FormComponent } from './clientes/form.component';
import { FormComponent2 } from './imc-ninos/form.component';
import { FormsModule } from '@angular/forms';
import { PaginatorComponent } from './paginator/paginator.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { DetalleComponent } from './clientes/detalle/detalle.component';


const routes: Routes = [
  {path:'', redirectTo: '/clientes', pathMatch:'full'},

  {path:'clientes', component: ClientesComponent},
  {path:'clientes/page/:page', component: ClientesComponent},
  {path:'imcnino', component: ImcNinosComponent},
  {path: 'clientes/form' , component: FormComponent},
  {path: 'clientes/form/:id' , component: FormComponent},
  

];
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ClientesComponent,
    ImcNinosComponent,
    FormComponent,
    FormComponent2,
    PaginatorComponent,
    DetalleComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule, 
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [ClienteService,ImcninoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
