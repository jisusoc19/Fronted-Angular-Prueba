import { Component, Input, OnInit } from '@angular/core';
import { max } from 'rxjs';

@Component({
  selector: 'paginator-nav',
  templateUrl: './paginator.component.html',

})
export class PaginatorComponent implements OnInit {

  @Input() paginador:any;
  paginas!: number[];
  desde!:number;
  hasta!:number;
  constructor(){}

  ngOnInit() {

    if(this.paginador.totalPages>5){

    }else{
      this.paginas= new Array(this.paginador.totalPages).fill(0).map((valor, indice)=>indice+1);
    }
    
      
  }

}
