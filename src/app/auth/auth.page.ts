import { Component, OnInit } from '@angular/core';
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";
import {LoadingController} from "@ionic/angular";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  isLoading=false;
  private _userIsAuthenticated;
  constructor(private authService:AuthService,
              private router:Router,
              private loadingCtrl:LoadingController) { }

  ngOnInit() {}

  getuserIsAuthenticated(){
    return this._userIsAuthenticated;
  }

  onLogin() {
    this.isLoading=true;
    this.authService.login();
    this.loadingCtrl.create({
      keyboardClose:true,
      message:'Logging in ...!'
    }).then(loginElm=>{
      loginElm.present();
      setTimeout(()=>{
        this.isLoading=false;
        loginElm.dismiss();
        this.router.navigateByUrl('places/tabs/discover');
      },1500)
    })


  }

  onSubmit(form:NgForm) {
    console.log(form)
  }
}
