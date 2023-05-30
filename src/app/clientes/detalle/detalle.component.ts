import { Component,OnInit,Input } from '@angular/core';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { ModalService } from './modal.service';
@Component({
  selector: 'detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  @Input() cliente!: Cliente;
  titulo: String = "Detalle del cliente";
  fotoselecionada!:File;

  constructor(private clienteService:  ClienteService, private activatedrouted:ActivatedRoute, public modelservie:ModalService){

  }
  ngOnInit() {
    // this.activatedrouted.paramMap.subscribe(params => {
    //   let id:number= +params.getAll('id');
    //   if (id){
    //     this.clienteService.getcliente(id).subscribe(cliente =>{
    //       this.cliente = cliente;
    //     });
    //   }
    // });
      
  }
  seleccionarFoto(event:any){
    this.fotoselecionada= event.target.files[0];
    console.log(this.fotoselecionada);
    if(this.fotoselecionada.type.indexOf('image')<0){
      Swal.fire('Error seleecionar imagen: ', 'el archivo debe ser del tipo imagen','error')
      

    }

  }
  subirFoto(){
    if(!this.fotoselecionada){
      Swal.fire('Error Upload: ', 'Debe seleccionar una foto','error');

    }else{
    this.clienteService.subirFoto(this.fotoselecionada,this.cliente.id)
    .subscribe(cliente=>{
      this.cliente=cliente;
      Swal.fire('La foto se ha subido completamente', 'success')
      
    });
    }

  }
  cerrarmodal(){
    this.modelservie.cerarmodal();
  }

}
