import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private formBuilder:FormBuilder, private db:AngularFireDatabase) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      userName: [''],
      userEmail: [''],
      userPassword: [''],
    });
  }


  saveUser(){
    
    this.db.database.ref('users').push(this.registerForm.value)
  }

}
