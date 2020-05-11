import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/Usuario.model';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  public user: User;

  constructor(private auth: AuthService) { }

  public sendForm(form: NgForm) {
    if (form.invalid) return; 

    this.auth.register(this.user).subscribe((response: any) => {
      console.log(response);
    }, error => {
      console.log(error.error.error.message)
    })
    
  }

  ngOnInit() { 
    this.user = new User();
  }


}
