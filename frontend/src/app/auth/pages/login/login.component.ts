import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ResultPlayer } from 'src/app/interfaces/result'; 
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup = this.fb.group({
    email:[null,[Validators.required, Validators.email]],
    password:[null, [Validators.required, Validators.minLength(6)]]
  })

  constructor(private fb:FormBuilder,
              private router:Router,
              private authAPI:AuthService)
             { }

  ngOnInit(): void {
  }

  login(){
    this.authAPI.postLogin(this.formLogin.value).subscribe({ 
                  next:(response)=>{
                    localStorage.setItem('playerToken', JSON.stringify(response.data?.token));
                    localStorage.setItem('id', JSON.stringify(response.data?.id));
                    this.router.navigateByUrl('/main')

                  },
                  error:(response)=>{
                    Swal.fire({
                      title:"Error *",
                      icon:"error",
                      text: response.data?.msg || 'Error login, check'
                    });
                    console.log('Err ',response.data)
                  }
   })}

}
