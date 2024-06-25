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
    this.http._refreshNeed.subscribe(()=>{
      this.barData()
    })
    this.barData()
  }

  barData(){
    this.http.getDt().subscribe(res => {
      for(const i of res){
        this.dataset.push(i)
      }
     return  this.dataset = [...this.dataset]
    })
  }
}
