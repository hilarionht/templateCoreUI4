import { Component, OnInit } from '@angular/core';
import { Marca } from '../../models/marca.model';
import { Modelo } from '../../models/modelo.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeloService, MarcaService } from '../../services/service.index';
import swal from 'sweetalert2';

@Component({
  selector: 'app-marca',
  templateUrl: './marca.component.html',
  styles: []
})
export class MarcaComponent implements OnInit {

  marca: Marca = new Marca('','','');
  modelo:Modelo = new Modelo('','','','','');
  modelos: Modelo[] = [];
  constructor(
    public activatedRoute: ActivatedRoute,
    public _modeloService: ModeloService,
    public _marcaService: MarcaService,
    public router: Router
  ) { 
    activatedRoute.params.subscribe( params => {
      let id = params['id'];
      if ( id !== 'nuevo' ) {
        this.cargarMarca( id );
      }
    });

  }

  ngOnInit() {
    
  }

  cargarMarca(id:string){
    this._marcaService.obtenerMarca(id).subscribe((marca)=> {
      this.marca = marca
      this.modelo.marca = id;
         console.log(this.marca);
         
      this.cargarModelos(id);
    });
  }
  cargarModelos(id: string){
    this._modeloService.cargarModelosById(id).subscribe(models => this.modelos = models.modelosbyid);
  }

  crearModelo() {
    swal({
      title: 'NUEVO MODELO',
      input: 'text',
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      showLoaderOnConfirm: true,
      
      allowOutsideClick: () => !swal.isLoading()
    }).then((result) => {
      if (result.value) {
       
        
        this.modelo.nombre = result.value;
        
        let idMarca = this.marca._id;
        //this.modelo.marca = this.marca._id; 
        console.log('modelo: ' , this.modelo, this.marca._id);
        this._modeloService.guardarModelo( this.modelo )
                .subscribe( () => this.cargarModelos(this.modelo.marca) );
      }
    })
  }
  editar(modelo:Modelo){
    this._modeloService.guardarModelo(modelo).subscribe(()=> this.cargarModelos(this.marca._id));
  }
  eliminar( modelo: Modelo ) {
    
    swal({
      title: "¿Está seguro?",
      html: 'Está a punto de borrar a <p> ' + modelo.nombre + '</p>',
      type: "warning",
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
      reverseButtons: true
  }).then((result) => {
      if (result.value) {

        this._modeloService.eliminarModelo( modelo._id )
         .subscribe( () =>  this.cargarModelos(this.modelo.marca) );  
      }
  });

  }
}
