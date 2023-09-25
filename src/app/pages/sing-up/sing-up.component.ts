import { Component, ViewChild } from '@angular/core';
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
  /*Ventana modal desactivada */
  showModal = false;

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
          ()=>{
            // Manejo de respuestas del servidor (Exito)
            
            console.log('El registro se realizó con éxito Redirigiendo al inicio de sesión.')
      
            // Limpia el formulario después del registro exitoso
             this.singUp.reset()
            //Abrimos la ventana modal
           this.showModal = true
            
          },
          ()=>{
            // manejo de errores del servidor (error)
            console.log('Los datos ingresados son invalidos para el registro')
          }
          
          
        )
      }
      return false
    } 
    
 

  GoLogin(){
   
    this.router.navigate(['/login'])
  }
  }


