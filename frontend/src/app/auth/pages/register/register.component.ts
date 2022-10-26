import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import {ResultPlayer} from 'src/app/interfaces/result';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
 
  formRegister: FormGroup = this.fb.group({
    username:[null,[Validators.required,Validators.minLength(4)]],
    email:[null,[Validators.required, Validators.email]],
    password:[null, [Validators.required, Validators.minLength(6)]],
    confirmPassword:[null, [Validators.required, Validators.minLength(6)]]
  })

  constructor(private fb:FormBuilder,
              private router:Router,
              private authApi:AuthService) { }

  ngOnInit(): void {
  }

  validarform(){
    if(this.formRegister.invalid){
       this.formRegister.markAllAsTouched()
       return false;
    }
    return true;
  }

  validarCampo(input:string){
    return this.formRegister.controls[input].errors 
          && this.formRegister.controls[input].touched
  }

  register(){

     if(!this.validarform()){
        return;
     }

    const {password, confirmPassword}=this.formRegister.value;
    //TODO: Realizar validacion check password form reactivo.
    if(password=== confirmPassword){
        this.authApi.postRegister(this.formRegister.value)
                    .subscribe({ 
                      next:(response:ResultPlayer)=>{
                        console.log(response.data)
                        this.router.navigateByUrl('/auth')
                      },
                      error:(error:ResultPlayer)=>{
                        Swal.fire({
                          title:'Failed register',
                          icon:'error',
                          text:error.data?.msg ||'Error'
                        }),
                        console.log(error);
            }})}  
    else{
      Swal.fire({
        title:'Error password',
        icon:'error',
        text:"Passwords don't match"
      })}
    }

}
