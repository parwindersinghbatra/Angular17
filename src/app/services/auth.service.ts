import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private uid?:string
  constructor(private router:Router) { 

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
  if (user) {
    this.uid = user.uid;
    console.log("User Logged in as this id : ", user.email)
  } else {
      this.uid = undefined
    console.log("User logged out")
  }
});
  }

isAuthenticated(){
  return this.uid? true : false;
}

getUid(){
  return this.uid;
}
  registerUser(email:string, password:string){
    

const auth = getAuth();
createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log({user})
    this.router.navigate(['/'])
    alert("User registration created successfully")
  })
  .catch((error) => {
    // const errorCode = error.code;
    // const errorMessage = error.message;
    console.error(error)
  });
}


loginUser(email:string, password:string){
  const auth = getAuth();
signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    
    const user = userCredential.user;
    console.log("Logged user ID and password: ", user)
    
    this.router.navigate(['/'])

  })
  .catch((error) => {
console.error(error)
  });
}

signOutUser(){
  const auth = getAuth();
signOut(auth).then(() => {
  this.router.navigate(['/'])
}).catch((error) => {
    console.error(error)
});
}

}