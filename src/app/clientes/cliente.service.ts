import { Injectable } from '@angular/core';
import { CLIENTES } from './clientes.json';
import { Cliente } from './cliente';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Injectable()
export class ClienteService {
 
  private urlendpoint : string = 'http://localhost:8080/api/imcadulto';
  private HttpHeaders = new HttpHeaders({'Content_Type': 'application/json'})
  constructor(private http: HttpClient, private router: Router) { }
  getclientes(page: number):  Observable<any>{
    //return of(CLIENTES);
    //return this.http.get<Cliente[]>(this.urlendpoint);
    return this.http.get(this.urlendpoint + '/page/' + page).pipe(
      
      tap((response: any) =>{
        
        (response.content as Cliente[]).forEach(cliente =>{
          console.log(cliente.nombre);
        })
      }),
      map((response:any) => {
        
        
        (response.content as Cliente[]).map(cliente =>{
          cliente.nombre=cliente.nombre.toUpperCase();
          return cliente;
        });
        return response;
      }),
      tap(response =>{
        (response.content as Cliente[]).forEach(cliente =>{
          console.log(cliente.nombre);
        });
      })
      )
  }
  create(cliente: Cliente): Observable<Cliente>{
    return this.http.post<Cliente>(this.urlendpoint, cliente ,{headers:this.HttpHeaders}).pipe(
      catchError(e =>{
        if(e.status==400){
          return throwError(() => e);
        }
        console.error(e.error.mensaje);
        Swal.fire("Error al crear " + e.error.mensaje ,'error');
        return throwError(() => Error);
      })
    )

  }
  getcliente(id: number): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlendpoint}/${id}`).pipe(
      catchError(e=>{
        
        this.router.navigate(['/clientes'])
        console.error(e.error.mensaje);
        Swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      }
    )
  )}
  update(cliente: Cliente): Observable<Cliente>{
    return this.http.put<Cliente>(`${this.urlendpoint}/${cliente.id}`, cliente, {headers: this.HttpHeaders}).pipe(
      catchError((e) =>{
        if(e.status==400){
          return throwError(() => e);
        }
        console.error(e.error.mensaje);
        Swal.fire("Error al editar el cliente: " + e.error.mensaje ,'error')
        return throwError(() => Error);
      })
    )
  }
  delete(id: number): Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlendpoint}/${id}`, {headers: this.HttpHeaders}).pipe(
      catchError(e =>{
        console.error(e.error.mensaje);
        Swal.fire("Error al Borrar el cliente: " + e.error.mensaje ,'error')
        return throwError(() => Error);
      })
    )
  }
  subirFoto(archivo: File, id:any ):Observable<Cliente>{
    let formData= new FormData();
    formData.append("archivo",archivo);
    formData.append("id",id);
    return this.http.post(`${this.urlendpoint}/upload`, formData).pipe(
      map( (response:any) => response.cliente as Cliente),
      catchError(e =>{
        console.error(e.error.mensaje);
        Swal.fire("Error al subir el archivo: " + e.error.mensaje ,'error')
        return throwError(() => Error);
      })
      

    );


  }
}
