import { Component, OnInit } from '@angular/core';
import { Cliente} from './cliente';
import { ClienteService } from './cliente.service';
import {Router, ActivatedRoute} from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  
})
export class FormComponent implements OnInit {
  cliente: Cliente = new Cliente()
  titulo1: string = "Crear cliente"
  errors!: string[];
  constructor(private clienteService:ClienteService , private router:Router, private activatedrouter: ActivatedRoute ){}
  ngOnInit(){

    this.cargarCliente()
  }
  cargarCliente(): void{
    this.activatedrouter.params.subscribe(params =>{
      let id = params['id'];
      if(id){
        this.clienteService.getcliente(id).subscribe((cliente)=> this.cliente =cliente)
      }
     })

  }
  create(): void{
    this.clienteService.create(this.cliente).subscribe(
      cliente => {

        this.router.navigate(['/clientes'])
        Swal.fire('Nuevo cliente', `Creado con exito`, 'success')
    },
    err =>{
      this.errors= err.error,this.errors as string[];
    

    }
    );
  }
  update():void{
    this.clienteService.update(this.cliente).subscribe(
      cliente =>{
        this.router.navigate(['/clientes'])
        Swal.fire('cliente Actualizado', `Actualizado con exito ` , 'success')
      }
    )

  }

}
