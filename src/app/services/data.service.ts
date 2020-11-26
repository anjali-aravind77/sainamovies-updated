import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { FirebaseApp } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';

import  auth  from 'firebase/app';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  userData; token;
  toggle=false;
  ngZone: any;
  constructor(private http:HttpClient,
    public afAuth: AngularFireAuth,
    public firebase: FirebaseApp,
    public afs:AngularFirestore,
    public router: Router) {
      this.afAuth.authState.subscribe(user => {
        if (user) {
         
          this.userData = user;
          localStorage.setItem('user', JSON.stringify(this.userData));
          
        } else {
          localStorage.setItem('user', null);
        }
      })
   }
 
   getToken(){
    this.token= JSON.parse(localStorage.getItem('token'));
   }
  getOptions(){
 
    let headers = new HttpHeaders();
    headers = headers.set('authorization', 'Bearer '+this.token);
    return {
      headers
    }
  }
  
  getBanner() {  
   this.getToken()
  return this.http.get('https://api-dev.sainaplay.info/banners',this.getOptions()); 
  }
  getHomeVideos()
{
  this.getToken()
  return this.http.get("https://api-dev.sainaplay.info/homevideos",this.getOptions())
}

getDetails(id){
  this.getToken()
  return this.http.get("https://api-dev.sainaplay.info/videos?videoId="+id,this.getOptions())
}

    signUp(data) {            
      this.afAuth.createUserWithEmailAndPassword(data.email, data.password)
      .then(() => {   
        
        this.router.navigateByUrl('');
      }).catch(error => {
        window.alert(error);
      })
    }
  
    get isLoggedIn(): boolean {
      const user = JSON.parse(localStorage.getItem('user'));
      return (user != null) ? true : false;
    }

    login (email, password) {      
      this.afAuth.signInWithEmailAndPassword(email, password)
      .then(userLogin => {
       userLogin.user.getIdToken().then(tokenValue => {
        localStorage.setItem('token', JSON.stringify(tokenValue));
       }).catch(err => {
         window.alert(err)
       })
        
         this.router.navigateByUrl("home")
      }).catch(err => {
        window.alert(err);
      })
    }
    toggleWithId;
    toggleView(){
     if(this.toggleWithId)
      this.toggle=!this.toggle
   
    }
    
     // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.auth.GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  AuthLogin(provider) {
    return this.afAuth.signInWithPopup(provider)
    .then((result) => {
       this.ngZone.run(() => {
          this.router.navigate(['home']);
        })
      // this.SetUserData(result.user);
    }).catch((error) => {
      window.alert(error)
    })
  }

    signOut() {
      return this.afAuth.signOut()      
      .then(() => {
        localStorage.removeItem('user');
        this.router.navigateByUrl('');
      })
    }
}