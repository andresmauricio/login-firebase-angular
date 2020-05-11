import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/Usuario.model';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  public user: User;

  constructor(private auth: AuthService,private router: Router) { }

  public sendForm(form: NgForm) {
    if (form.invalid) return; 
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    })
    Swal.showLoading();
    this.auth.register(this.user).subscribe((response: any) => {
      Swal.close();
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
  }


}
