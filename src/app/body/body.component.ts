import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrl: './body.component.scss',
})
export class TableComponent implements OnInit {
  dataId: any;
  isUpdate!: boolean;
  myForm: FormGroup | any;
  data: any[] = [];

  ngOnInit(): void {
    this.myForm = new FormGroup({
      name: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
    });
    this.http.getDt();
    this.getAllData();
  }

  onClick() {
    if (!this.isUpdate) {
      this.http.postData(this.myForm.value);
    this.myForm.reset();

    } else {
      this.http.updateDetails(this.dataId, this.myForm.value);
    this.myForm.reset();

    }
    this.isUpdate = false;
  }
  constructor(private http: HttpService) {}

  getAllData() {
    this.http.newGetData.subscribe((param: any) => {
      this.data = param;
    });
  }

  update(data: any) {
    this.dataId = data;
    let currentId = this.data.find((a) => {
      this.getAllData();
      return a.id === data;
    });
    this.myForm.setValue({
      name: currentId.name,
      price: currentId.price,
      category: currentId.category,
    });
    this.isUpdate = true;
  }

  onDelete(id: string) {
    alert('you want delete item!');
    this.http.deleteData(id);
    this.getAllData();
  }
}
