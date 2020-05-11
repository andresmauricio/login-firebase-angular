import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/Usuario.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public user: User;
  constructor() { }

  sendLogin(form: NgForm) {
    if (form.invalid) return;
    console.log(this.user);
    
  }

  ngOnInit() {
    this.user = new User();
  }

}
