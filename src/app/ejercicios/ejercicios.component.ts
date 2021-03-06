import { Component, NgZone, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import { EjerciciosService } from '../ejercicios.service';

@Component({
  selector: 'app-ejercicios',
  templateUrl: './ejercicios.component.html',
  styleUrls: ['./ejercicios.component.css']
})
export class EjerciciosComponent implements OnInit {
  forma: FormGroup;
  id: string | null;
  titulo = "Agregar ejercicio";
  isReadOnly = false;
  constructor(private fb: FormBuilder, private ngZone: NgZone, private router: Router, private crud: EjerciciosService, private aRoute: ActivatedRoute) {
    this.crearFormulario();
    this.setDefaults();
    this.id = this.aRoute.snapshot.paramMap.get('id');
  }


  ngOnInit(): void {
    this.esEditar();
    if (this.router.url.includes('read')) {
      this.isReadOnly = true;
      this.titulo = "Ver ejercicio"
    } else {
      this.isReadOnly = false;
    }
  }

  public archivoForm = new FormGroup({
    archivo: new FormControl(null, Validators.required),
  });

  public mensajeArchivo  = 'No hay un archivo seleccionado';
  public datosFormulario = new FormData();
  public nombreArchivo = '';
  public URLPublica = '';
  public porcentaje = 0;
  public finalizado = false;

  public cambioArchivo(event){
    if(event.target.files.length > 0){
      for(let i = 0; i < event.target.files.length; i++){
        this.mensajeArchivo = `Archivo preparado: ${event.target.files[i].name}`;
        this.nombreArchivo = event.target.files[i].name;
        this.datosFormulario.delete('archivo');
        this.datosFormulario.append('archivo', event.target.files[i], event.target.files[i].name);
      }
    } else{
      this.mensajeArchivo = 'No hay un archivo seleccionado';
    }
  }

  public subirArchivo(){
    let archivo = this.datosFormulario.get('archivo');
    let referencia = this.crud.referenciaCloudStorage(this.nombreArchivo);
    let tarea = this.crud.tareaCloudStorage(this.nombreArchivo, archivo);
    tarea.percentageChanges().subscribe((porcentaje) => {
      this.porcentaje = Math.round(porcentaje);
      if(this.porcentaje == 100){
        this.finalizado = true;
      }
    });

    setTimeout(() => {
      referencia.getDownloadURL().subscribe((URL) =>{
        this.URLPublica = URL;
        this.forma.value.urlDownload = URL;
      });
    }, 2000)
    
  }
  
  get inputs() {
    return this.forma.get('solution.inputs') as FormArray;
  }

  get outputs() {
    return this.forma.get('solution.outputs') as FormArray;
  }

  get examples() {
    return this.forma.get('examples') as FormArray;
  }



  createOutput() {
    return this.fb.group({
      name: ['', [Validators.required,]],
      type: ['', [Validators.required,]]
    });
  }

  createExample() {
    return this.fb.group({
      call: ['', [Validators.required,]],
      comment: [],
      result: ['', [Validators.required,]]
    })
  }

  get callInvalido() {
    return this.forma.get('call').invalid && this.forma.get('call').touched;
  }

  get creatorInvalido() {
    return this.forma.get('creator').invalid && this.forma.get('creator').touched;
  }

  get detailsInvalido() {
    return this.forma.get('details').invalid && this.forma.get('details').touched;
  }

  get nameInvalido() {
    return this.forma.get('name').invalid && this.forma.get('name').touched;
  }

  get codeInvalido() {
    return this.forma.get('solution.code').invalid && this.forma.get('solution.code').touched;
  }

  get sectionInvalido() {
    return this.forma.get('section').invalid && this.forma.get('section').touched;
  }



  crearFormulario() {

    this.forma = this.fb.group(
      {
        call: ['', [Validators.required, Validators.minLength(5)]],
        creator: ['', [Validators.required,]],
        code: [],
        created: [],
        details: ['', [Validators.required,]],
        examples: this.fb.array([

        ]),
        level: ['', ,],
        name: ['', [Validators.required,]],
        section: ['', [Validators.required,]],
        solution: this.fb.group({
          code: ['', [Validators.required,]],
          outputs: this.fb.array([

          ]),
          inputs: this.fb.array([

          ])


        }),
        urlDownload: ['', []]

      }

    );

  }


  setDefaults() {
    //this.forma.setValue(
    this.forma.reset(
      {
        call: "",
        creator: "",
        created: "2021-06-24",
        code: "-1",
        details: "",
        level: "1",
        name: "",
        section: "",
        solution: {
          code: ""

        },
        fechaCreacion: "",
        fechaActualizacion: "",
        urlDownload: "",

      });

    const cfb = this.createOutput();
    cfb.get('name').setValue('');
    cfb.get('type').setValue('');



    (this.forma.get('solution.outputs') as FormArray).push(cfb);

    const ifb = this.createOutput();
    ifb.get('name').setValue('');
    ifb.get('type').setValue('');



    (this.forma.get('solution.inputs') as FormArray).push(ifb);

    const efb = this.createExample();
    efb.get('call').setValue('');
    efb.get('comment').setValue('');
    efb.get('result').setValue('');

    (this.forma.get('examples') as FormArray).push(efb);


    //  [['test'], ['gym', 'type'], ['leer', 'type']].forEach (valor => this.inputs.push(this.fb.control(valor)));
    //this.inputs.push(this.fb.control(['hola', 'test']));


    //['tenis2', 'gym2', 'leer2'].forEach (valor => this.outputs.push(this.fb.control(valor)));
    //this.inputs.push(this.fb.control(asd));
  }

  agregarOutput() {
    const cfb = this.createOutput();
    cfb.get('name').setValue('');
    cfb.get('type').setValue('');



    (this.forma.get('solution.outputs') as FormArray).push(cfb);
  }

  borrarOutput(i: number) {
    this.outputs.removeAt(i);
  }

  agregarInput() {
    const cfb = this.createOutput();
    cfb.get('name').setValue('');
    cfb.get('type').setValue('');



    (this.forma.get('solution.inputs') as FormArray).push(cfb);
  }

  borrarInput(i: number) {
    this.inputs.removeAt(i);
  }

  agregarExample() {
    const efb = this.createExample();
    efb.get('call').setValue('');
    efb.get('comment').setValue('');
    efb.get('result').setValue('');

    (this.forma.get('examples') as FormArray).push(efb);
  }

  borrarExample(i: number) {
    this.examples.removeAt(i);
  }

  guardar() {
    if (this.forma.invalid) {
      Object.values(this.forma.controls).forEach(control => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach(innerControl => {
            innerControl.markAllAsTouched();
          })

        } else {
          control.markAsTouched();
        }

      })

    } else {
      let data: any = this.forma.value;

      data.fechaActualizacion = new Date();
      console.log(data);
      if (this.id !== null) {
        this.crud.actualizarEjercicio(this.id, data).then(() => {
          this.router.navigate(['/admin']);
        })
      } else {
        data.fechaCreacion = new Date();
        this.crud.agregarEjercicio(data);
      }

      console.log("Se pudo");
      this.ngZone.run(() => this.router.navigate(["/admin"]));
    }//else


  }

  esEditar() {

    if (this.id !== null) {
      this.titulo = 'Editar ejercicio'
      this.crud.getEjercicio(this.id).subscribe(data => {
        this.forma.reset(
          {
            call: data.payload.data()['call'],
            creator: data.payload.data()['creator'],
            created: data.payload.data()['created'],
            code: data.payload.data()['code'],
            details: data.payload.data()['details'],
            level: data.payload.data()['level'],
            name: data.payload.data()['name'],
            section: data.payload.data()['section'],
            solution: data.payload.data()['solution'],
            examples: data.payload.data()['examples'],
            urlDownload: data.payload.data()['urlDownload']
          });
        this.URLPublica = data.payload.data()['urlDownload'];
      })
    }
  }
}
