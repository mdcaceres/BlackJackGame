import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  
  register(){
    const {password, confirmPassword}=this.formRegister.value;
    //TODO: Realizar validacion check password form reactivo.
    if(password=== confirmPassword){
        this.authApi.postRegister(this.formRegister.value)
                    .subscribe((result:ResultPlayer)=>{
                      if(!result.error){
                        console.log(result.data)
                        this.router.navigateByUrl('/auth')
                      }
                      else{
                        Swal.fire({
                          title:'Failed register',
                          icon:'error',
                          text:result.data?.msg ||'Error'
                          
                        })
                      }
                    })
    }
    else{
      Swal.fire({
        title:'Error password',
        icon:'error',
        text:"Passwords don't match"
      })
    }

  }

}
