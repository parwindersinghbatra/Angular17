import { Component } from '@angular/core';
import { DbService } from '../../services/db.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-snippet',
  standalone: true,
  imports: [],
  templateUrl: './view-snippet.component.html',
  styleUrl: './view-snippet.component.css'
})
export class ViewSnippetComponent {

  codeSnippet = {
    title:"",
    code:""
  }
  constructor(private route: ActivatedRoute, private dbService: DbService ){}

  ngOnInit(){
    const docID = this.route.snapshot.paramMap.get('id');
    console.log(docID);
   this.dbService.getPerticularData(docID!).then((data:any) =>{
    this.codeSnippet = data;
    console.log(this.codeSnippet)
 }) 
}
}