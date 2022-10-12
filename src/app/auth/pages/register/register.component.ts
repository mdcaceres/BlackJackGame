import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
 
  formRegister: FormGroup = this.fb.group({
    username:["test",[Validators.required,Validators.minLength(4)]],
    email:["example@example.com",[Validators.required, Validators.email]],
    password:["123456", [Validators.required, Validators.minLength(8)]],
    confirmPassword:["123456", [Validators.required, Validators.minLength(8)]]
  })

  constructor(private fb:FormBuilder,
              private router:Router,
              private authApi:AuthService) { }

  ngOnInit(): void {
  }
  
  register(){
    const {password, confirmPassword}=this.formRegister.value;
    if(password=== confirmPassword){
        //TODO accion registro ok
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
