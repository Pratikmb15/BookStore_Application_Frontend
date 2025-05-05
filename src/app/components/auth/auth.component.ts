import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/User/user.service';


@Component({
  selector: 'app-auth',
  standalone: false,
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent implements OnInit{
constructor(private formbuild: FormBuilder,private user:UserService){}
signupForm!:FormGroup;
loginForm!:FormGroup;


hidePassword = true;
login : boolean=true;
signUp : boolean=true;
  ngOnInit(): void {
    this.signUp=true;
    this.login=false;
    this.loginForm = this.formbuild.group({
      email: ['',[Validators.required,Validators.email]],
      password: ['',Validators.required]
    })
    this.signupForm = this.formbuild.group({
      fullName: ['',Validators.required],
      email: ['',[Validators.required,Validators.email]],
      password: ['',Validators.required],
      mobileNum: ['',[Validators.required]] 
    });
}
openLogin(){
  this.login=true;
  this.signUp=false;
 }
 openSignUp(){
   this.signUp=true;
  this.login=false;
 }
 Login() {

  let reqData = {
    email: this.loginForm.value.email,
    password: this.loginForm.value.password
  }
  return this.user.login(reqData).subscribe((res: any) => {
    console.log(res)
    localStorage.setItem("token", res.data)
  })
}
signup() {

  const reqData = {
    fullName: this.signupForm.value.fullName,
    email: this.signupForm.value.email,
    password: this.signupForm.value.password,
    mobileNum: this.signupForm.value.mobileNum 
  };

  this.user.register(reqData).subscribe((res: any) => {
    console.log(res);
  });
}
get loginEmail() {
  return this.loginForm.get('email');
}
get loginPassword(){
  return this.loginForm.get('password');
}
get signUpFullName(){
  return this.signupForm.get('fullName');
}
get signUpEmail(){
  return this.signupForm.get('email');
}
get signUpPassword(){
  return this.signupForm.get('password');
}
get signUpMobileNum(){
  return this.signupForm.get('mobileNum');
}
}
