import { Component, OnInit } from '@angular/core';
import { asElementData } from '@angular/core/src/view';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-ejercicios',
  templateUrl: './ejercicios.component.html',
  styleUrls: ['./ejercicios.component.css']
})
export class EjerciciosComponent implements OnInit {
  forma : FormGroup;
  testOutput: [any];
  constructor(private fb:FormBuilder) { 
    this.crearFormulario();
    this.setDefaults();
  }

  
  ngOnInit(): void {
    
     
      
      const cfb = this.createOutput();
      cfb.get('name').setValue('name');
      cfb.get('type').setValue('type');
      console.log("aló");
      console.log(cfb);
        
      
      (this.forma.get('solution.outputs') as FormArray).push(cfb);
      
      
    
  }

  get inputs(){
    return this.forma.get('solution.inputs') as FormArray;
  }

  get outputs(){
    return this.forma.get('solution.outputs') as FormArray;
  }



  createOutput(){
    return this.fb.group({
      name: [],
      type: []
    });
  }

  


  crearFormulario(){
    
    this.forma = this.fb.group(
      {
        call  : ['', [Validators.required, Validators.minLength(5)] ],
        creator: ['', [Validators.required, ] ],
        details  : ['', , ],
        examples: this.fb.group(
          {
            call: ['', Validators.required],
            comment: [ '', Validators.required],
            result: [ '', Validators.required]
          }
        ),
        name : ['', , ],
        section : ['', , ],
        solution: this.fb.group({
          code : ['', , ],
          outputs: this.fb.array([
            
          ]),
          inputs: this.fb.array([
            
          ])
          

        })
        
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
          call: "call",
          comment: "comment",
          result: "result",
        },
        name: "name",
        section: "section",
        solution:{
          code: "codigo",
          inputs:[
            {
              name: "buenas",
              type: "saludos",
            }
          ],
          outputs:[
            {
              name: "asd",
              type: "jeje",
            }
          ]
        }
        
      });

      const cfb = this.createOutput();
      cfb.get('name').setValue('aloha');
      cfb.get('type').setValue('jejeps');
      
        
      
      (this.forma.get('solution.outputs') as FormArray).push(cfb);
      

    //  [['test'], ['gym', 'type'], ['leer', 'type']].forEach (valor => this.inputs.push(this.fb.control(valor)));
      //this.inputs.push(this.fb.control(['hola', 'test']));
      
      
      //['tenis2', 'gym2', 'leer2'].forEach (valor => this.outputs.push(this.fb.control(valor)));
      //this.inputs.push(this.fb.control(asd));
  }




  
  agregarOutput(){
    this.outputs.push(this.fb.control('Hola array', Validators.required));
  }

  borrarOutput(i:number){
    this.outputs.removeAt(i);
  }
}
