import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import Swal from 'sweetalert2';
import { tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from './detalle/modal.service';
@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  
})
export class ClientesComponent implements OnInit {
  clientes! : Cliente[];
  paginador:any;
  clienteselecioando!:Cliente;

  constructor(private clienteService: ClienteService , private activatedRoute: ActivatedRoute , public modelservie:ModalService){}
  ngOnInit(){
    
    this.activatedRoute.paramMap.subscribe( params =>{
    let page: number = +params.getAll('page');
    if(!page){
      page=0;
    }
      this.clienteService.getclientes(page).pipe(
        tap(response=> {
          console.log('ClientesComponent: tap 3');
          (response.content as Cliente[]).forEach(cliente =>{
            console.log(cliente.nombre);
          });
        })
      ).subscribe(
        response => {
          this.clientes = response.content as Cliente[];
          this.paginador=response;
        });
        
      }
    );

  }
  delete(cliente: Cliente): void{
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Esta seguro?',
      text: `Seguro que quiere eliminar al Cliente ${cliente.nombre}!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminalo!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.delete(cliente.id).subscribe(
          response => {
            this.clientes= this.clientes.filter(cli => cli!== cliente)
            swalWithBootstrapButtons.fire(
              'Cliente Eliminado!',
              `Cliente Eliminado con exito ${cliente.nombre}`,
              'success'
            )
          })
      }
    })
    
  }
  abrirmodal(cliente: Cliente){
    this.clienteselecioando= cliente;
    this.modelservie.abrirmodal();
  }

}
