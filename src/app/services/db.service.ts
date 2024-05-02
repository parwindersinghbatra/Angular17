import { Injectable } from '@angular/core';
import { doc, getFirestore } from "firebase/firestore";
import { collection, addDoc, getDocs, getDoc } from "firebase/firestore"; 
import { AuthService } from './auth.service';
import { title } from 'process';
import { Snippet } from '../../models/snippet';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  private db?:any

  constructor(private authService: AuthService, private router:Router) {
this.db = getFirestore()
   }

   
async createSnippet(snippet:Snippet){
try {
  const docRef = await addDoc(collection(this.db, "snippets"), {
   ...snippet,
   by:this.authService.getUid(),
  });
  this.router.navigate(['/'])
} catch (e) {
  console.error("Error adding document: ", e);
}

}

async getAllData(){
  let result: any[] = []
  const querySnapshot = await getDocs(collection(this.db, "snippets"));
querySnapshot.forEach((doc) => {
  result.push({id:doc.id, ...doc.data()});
  
});
return result;
}

async getPerticularData(docId:string){
  const docRef = doc(this.db, "snippets", docId);
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  // console.log("Document data:", docSnap.data());
  return docSnap.data();
} else {
  return {
    id:"1",
    title:"Not Found",
    code:"Not Found"
  }

}
}

}
