import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-ejercicios',
  templateUrl: './ejercicios.component.html',
  styleUrls: ['./ejercicios.component.css']
})
export class EjerciciosComponent implements OnInit {
  forma : FormGroup;

  constructor(private fb:FormBuilder) { 
    this.crearFormulario();
    this.setDefaults();
  }

  ngOnInit(): void {
  }

  get inputs(){
    return this.forma.get('inputs') as FormArray;
  }

  get outputs(){
    return this.forma.get('outputs') as FormArray;
  }




  crearFormulario(){
    this.forma = this.fb.group(
      {
        call  : ['', [Validators.required, Validators.minLength(5)] ],
        creator: ['', [Validators.required, ] ],
        details  : ['', , ],
        examples: this.fb.group(
          {
            Ecall: ['', Validators.required],
            Ecomment: [ '', Validators.required],
            Eresult: [ '', Validators.required]
          }
        ),
        name : ['', , ],
        section : ['', , ],
        inputs: this.fb.array([
          
        ]),
        outputs: this.fb.array([
          
        ])
      }

    );

  }


  setDefaults(){
    //this.forma.setValue(
      this.forma.reset(
      {
        call: "Diego",
        creator: "Mora",
        details: "diego@gmail.com",
        examples: {
          Ecall: "call",
          Ecomment: "comment",
          Eresult: "result",
        },
        name: "name",
        section: "section"
      });

      let asd = {
        name: "testing",
        type: "type"
      };
    //  [['test'], ['gym', 'type'], ['leer', 'type']].forEach (valor => this.inputs.push(this.fb.control(valor)));
      this.inputs.push(this.fb.control(['hola', 'test']));
      console.log(this.inputs);
      
      ['tenis2', 'gym2', 'leer2'].forEach (valor => this.outputs.push(this.fb.control(valor)));
  }



  agregarInput(){
    this.inputs.push(this.fb.control('Hola array', Validators.required));
  }

  borrarInput(i:number){
    this.inputs.removeAt(i);
  }

  
  agregarOutput(){
    this.outputs.push(this.fb.control('Hola array', Validators.required));
  }

  borrarOutput(i:number){
    this.outputs.removeAt(i);
  }
}
