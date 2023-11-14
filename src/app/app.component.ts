import { Component } from '@angular/core';
import { FormularioData } from 'src/app/interface/singup-data.interface';
import { FormBuilder,FormGroup, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { group } from '@angular/animations';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  matcher = new MyErrorStateMatcher();
  title = 'reactiveforms';
  formulario = new FormGroup({
    nombre:new FormControl ('', [Validators.required]),
    apellido:new FormControl ('', [Validators.required]),
    correo:new FormControl ('', [Validators.required, Validators.email]),
    password:new FormControl ('', [Validators.required, Validators.minLength(3), Validators.maxLength(8)]),
    repetirpassword:new FormControl ('', [Validators.required]),
  });


  validarpassword(): boolean {
    const password = this.formulario.controls['password'].value;
    const repetirpassword = this.formulario.controls['repetirpassword'].value;
    return password === repetirpassword;
  }

  submitFormulario() {
    if (this.formulario.valid && this.validarpassword()) {
      // Realizar acciones en caso de que el formulario sea válido
      console.log('Formulario válido. Acciones a realizar...');
    } else {
      // Mostrar errores en caso de que el formulario no sea válido
      console.log('Formulario inválido. Revisa los campos.');
    }
  }
}
