import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  public email: any;
  public password: any;
  public indexValue: number;

  registerdUserData: Object;

  //invalid msg
  invalidMsg = false;

  onLogin(){
    if(this.authService.isAuthenticated(this.email, this.password)){
      localStorage.setItem('dash_key', "true");
      this.router.navigateByUrl("dashboard");
      this.indexValue = this.authService.indexValue;
      // console.log('indexxxx',this.indexValue);
    }
    else{
      this.invalidMsg = true;
    }
  }

  onRegistration(){
    localStorage.setItem("reg_key", "true");
    this.router.navigateByUrl('/registration')
  }
}
