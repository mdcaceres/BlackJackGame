import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

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

    this.authAPI.postLogin(this.formLogin.value).subscribe({
                  next:()=>{

                  },
                  error:()=>{

                  }
                })
    //this.router.navigateByUrl('/game')
  }

}
