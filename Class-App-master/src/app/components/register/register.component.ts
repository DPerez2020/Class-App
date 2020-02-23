import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  // Variable para el formulario
  registerForm: FormGroup;
  itemRef: any;
  // Variable para el formulario
  constructor(private router: Router, private userAuth: AngularFireAuth, private rltDatabase: AngularFireDatabase,
              private formBuilder: FormBuilder) { 

      }

  ngOnInit() {
    // Inicializando formulario
    this.registerForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
      userEmail: ['', [Validators.required, Validators.email]],
      userPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
    });
    // Inicializando formulario
  }
  // Funcion para crear nuevos usuarios en el sistema
  async createUser() {
    // Extrayendo datos del formulario
    const userName = this.registerForm.value.userName;
    const userEmail = this.registerForm.value.userEmail;
    const userPassword = this.registerForm.value.userPassword;
    // Extrayendo datos del formulario
    // Crear usuario
    await this.userAuth.auth.createUserWithEmailAndPassword(userEmail, userPassword)
    // Crear usuario
    // En caso de un registro exitoso se ejecutara este codigo
    .then(() => {
      // Actualizando objeto de usuario
      this.userAuth.auth.onAuthStateChanged((userData) => {
        // Actualizando Nombre del usuario
        userData.updateProfile({
          displayName: userName,
        });
        // Actualizando Nombre del usuario
      });      
      // Actualizando objeto de usuario
      // Creando id en el sistema para los usuarios
      const userID = this.userAuth.auth.currentUser.uid;
      const systemID = Date.now();
      // Creando id en el sistema para los usuarios
      // Creando registro en la base de datos
      this.rltDatabase.database.ref('classApp/users/' + userID + '/').set({
        userName: userName,
        userID: userID,
        userSystemID: systemID,
        userEmail: userEmail,
      })
      // Creando registro en la base de datos
      // Verificando cuenta del usuario
      this.userAuth.auth.currentUser.sendEmailVerification();
      // Verificando cuenta del usuario
      // Alertando al usuario sobre un registro exitoso
      alert('Registro exitoso');
      this.router.navigate(['/login']);
      // Alertando al usuario sobre un registro exitoso
    })
    // En caso de un registro exitoso se ejecutara este codigo
    // En caso de un error se ejecutara este codigo
    .catch((error) => {
      const errorCodes = error.code;
      switch (errorCodes) {
        case 'auth/invalid-email':
          alert('Correo incorrecto');
          break;
        case 'auth/email-already-in-use':
          alert('Correo en uso');
          break;
        case 'auth/operation-not-allowed':
          alert('Estamos trabajando por un mejor pais');
          break;
        case 'auth/weak-password':
          alert('Estamos trabajando por un mejor pais');
          break;
      }
    });
    // En caso de un error se ejecutara este codigo
  }
  // Funcion para crear nuevos usuarios en el sistema
  // Funcion para ir al login
  goToLogin() {
    this.router.navigate(['/login']);
  }
// Funcion para ir al login
}
