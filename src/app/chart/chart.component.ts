import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss'
})
export class ChartComponent implements OnInit{
  title = 'barchartApp';
  dataset: any[] = [];
  
constructor(private http : HttpService){}

  ngOnInit(): void {
    this.http.newGetData.subscribe((data)=>{
      this.dataset = [];
      this.dataset = data;
      console.log('asdf',this.dataset)
    })
    // this.barData()
  }

  barData(){
    this.http.getDt()
  }
}
