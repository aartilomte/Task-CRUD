import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject, map, tap } from "rxjs";

@Injectable()

export class HttpService{
    constructor(private http : HttpClient){}
    refreshNeed: any;
    private _refreshNeed$ = new Subject<void>();

    get _refreshNeed(){
        return this._refreshNeed$;
    }

postData( post : any){
    this.http.post('https://interview-28ad1-default-rtdb.asia-southeast1.firebasedatabase.app///table.json',post).pipe(
        tap(()=>{
            this._refreshNeed.next()
        })
    ).subscribe((param : any)=>{
        console.log(param)
        this.getDt()

    })
}

 getDt(){
    return this.http.get('https://interview-28ad1-default-rtdb.asia-southeast1.firebasedatabase.app///table.json').pipe(map((resp : any)=>{
        const myData = [];
        for(let data in resp){
            myData.push({...resp[data ], id : data , value : +resp[data].price})
        }
        console.log(myData);
        return myData
    }))
}

deleteData(id : string){
    this.http.delete('https://interview-28ad1-default-rtdb.asia-southeast1.firebasedatabase.app///table/'+id+'.json').pipe(
        tap(()=>{
            this._refreshNeed.next()
        })
    ).subscribe((param : any)=>{
        console.log(param)
       return  this.getDt()
    })
}

updateDetails(id:string , status:any){
     this.http.put('https://interview-28ad1-default-rtdb.asia-southeast1.firebasedatabase.app///table/'+id+'.json',status).pipe(
        tap(()=>{
            this._refreshNeed.next()
        })
    ).subscribe((param : any)=>{
        console.log(param)
         this.getDt()

    })

 }
}