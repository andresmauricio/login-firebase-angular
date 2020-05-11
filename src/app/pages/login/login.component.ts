import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/Usuario.model';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public user: User;
  public recovery: boolean;
  constructor(private auth: AuthService, private router: Router) { }

  sendLogin(form: NgForm) {
    if (form.invalid) return;
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    })
    Swal.showLoading();
    this.auth.login(this.user).subscribe((response: any) => {
      Swal.close();
      if (this.recovery) {
        localStorage.setItem('email', this.user.email);
      }
      this.router.navigateByUrl('/home');
    }, error => {
      Swal.close();
      Swal.fire({
        icon: 'error',
        text: error.error.error.message
      })
    })
    
  }

  ngOnInit() {
    this.user = new User();
    if (localStorage.getItem('email')) {
      this.user.email = localStorage.getItem('email');
      this.recovery = true;
    }
  }

}
