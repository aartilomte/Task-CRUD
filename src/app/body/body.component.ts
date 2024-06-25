import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrl: './body.component.scss'
})
export class TableComponent implements OnInit{
  dataId: any;
  isUpdate! : boolean;
  myForm : FormGroup | any;
  data: any[] = [];
  

  ngOnInit(): void {
    this.myForm = new FormGroup({
      name : new FormControl(''),
      price : new FormControl(''),
      category : new FormControl('')
     
    })

    this.getAllData()
    this.http._refreshNeed.subscribe(()=>{
      this.getAllData()
    })
}

onClick(){
  if(!this.isUpdate){
    this.http.postData(this.myForm.value)
  }else{
    this.http.updateDetails(this.dataId , this.myForm.value)
  }
  this.isUpdate = false;
  this.myForm.reset()
}
constructor(private http : HttpService){}
 

getAllData(){
  this.http.getDt().subscribe((param : any)=>{
    console.log(param)
    this.data = param;
  })
}

update(data : any){
  console.log(data)
  this.dataId = data
  let currentId = this.data.find((a)=>{
    this.getAllData()
    return a.id === data 
  })
    this.myForm.setValue({name : currentId.name , price : currentId.price , category : currentId.category})
    console.log(currentId)
 
  this.isUpdate = true
}

onDelete(id: string) {
  alert("you want delete item!")
  this.http.deleteData(id)
  this.getAllData()
}

}
