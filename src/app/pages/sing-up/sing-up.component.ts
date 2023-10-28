import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.css']
})
export class SingUpComponent {

  singUp: FormGroup
  

  constructor(
    private router: Router, 
    private fb: FormBuilder,
    private userService: UserService,
   
    ){
      this.singUp = this.fb.group({
        username: ['',[Validators.required]],
        password: ['',[Validators.required]],
        name: ['',[Validators.required]],
        email: ['',[Validators.required]],
      })

    }
    onSubmit(){
      if (this.singUp.valid){

        const user = this.singUp.value
        this.userService.singUpUser(user).subscribe(
          (response)=>{
            // Manejo de respuestas del servidor (Exito)
            console.log('El registro se realizó con éxito Redirigiendo al inicio de sesión.')
            this.singUp.reset()
          
          },
          (error)=>{
            // manejo de errores del servidor (error)
            console.log('Los datos ingresados son invalidos para el registro')
          }
           // Limpia el formulario después del registro exitoso
          
        )
      }
    } 
   
  }


