import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  itemRef: any;
  users = []
  constructor(private db:AngularFireDatabase) { }

  ngOnInit() { 
    this.itemRef = this.db.object('users');
this.itemRef.snapshotChanges().subscribe(action => {
  let data = action.payload.val()
  this.users=[];
  for(let k in  data){
    console.log(k);
    data[k].key = k ;
    this.users.push(data[k])
  }
  
  console.log(this.users);
  
});
        
  }


  delete(userKey){
    this.db.database.ref('users/'+userKey).remove()
  }
  edit(user){

  }

}
