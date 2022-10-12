import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup = this.fb.group({
    email:["example@example.com",[Validators.required, Validators.email]],
    password:["123456", [Validators.required, Validators.minLength(8)]]
  })

  constructor(private fb:FormBuilder,
              private router:Router,
              private authAPI:AuthService)
             { }

  ngOnInit(): void {
  }

  login(){
    this.authAPI.postLogin(this.formLogin.value).subscribe((response)=>{
                  if(response.ok){
                    console.log(response)
                    localStorage.setItem('user', JSON.stringify(response))//acá sera el usuario, token,  lo que requiera.
                    this.router.navigateByUrl('/game')
                  }else{
                    Swal.fire({
                      title:"Error",
                      icon:"error",
                      text:response.error
                    })
                    console.log(response)
                  }
                 
                })
  }

}
