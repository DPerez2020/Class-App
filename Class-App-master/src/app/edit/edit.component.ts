import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  registerForm: FormGroup;
  user:any
  constructor( private formBuilder:FormBuilder, private active:ActivatedRoute, private db:AngularFireDatabase) { }

  ngOnInit() {
    this.active.queryParams.subscribe(e=>{
     this.user=e;
      
    })
    this.registerForm = this.formBuilder.group({
      userName: [this.user.userName],
      userEmail: [this.user.userEmail],
      userPassword: [this.user.userPassword],
    });
  }

  updateData(){
    this.db.database.ref('users/'+this.user.key).set(this.registerForm.value)
  }

}
