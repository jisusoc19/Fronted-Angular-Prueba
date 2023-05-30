import { Component, OnInit } from '@angular/core';
import { ImcNino } from './imc-nino';
import { ImcninoService } from './imcnino.service';

@Component({
  selector: 'app-imc-ninos',
  templateUrl: './imc-ninos.component.html',
  
})
export class ImcNinosComponent  implements OnInit {

  imcNinos!: ImcNino[];

  constructor(private imcninoService:ImcninoService ){
  }
  ngOnInit(){
    this.imcninoService.getimcnino().subscribe(
      imcNinos => this.imcNinos = imcNinos
    );

  }

}
