import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, map, tap } from 'rxjs';

@Injectable()
export class HttpService {
  constructor(private http: HttpClient) {}
  refreshNeed: any;
  public newGetData = new Subject<any>();

  postData(post: any) {
    this.http
      .post(
        'https://interview-28ad1-default-rtdb.asia-southeast1.firebasedatabase.app///table.json',
        post
      )
      .subscribe((param: any) => {
        this.getDt();
      });
  }

  getDt(): any {
    this.http
      .get(
        'https://interview-28ad1-default-rtdb.asia-southeast1.firebasedatabase.app///table.json'
      )
      .pipe(
        map((resp: any) => {
          const myData = [];
          for (let data in resp) {
            myData.push({ ...resp[data], id: data, value: +resp[data].price });
          }
          this.newGetData.next(myData);
        })
      )
      .subscribe((param: any) => {
        console.log(param);
      });
  }

  deleteData(id: string) {
    this.http
      .delete(
        'https://interview-28ad1-default-rtdb.asia-southeast1.firebasedatabase.app///table/' +
          id +
          '.json'
      )
      .subscribe((param: any) => {
        this.getDt();
      });
  }

  updateDetails(id: string, status: any) {
    this.http
      .put(
        'https://interview-28ad1-default-rtdb.asia-southeast1.firebasedatabase.app///table/' +
          id +
          '.json',
        status
      )
      .subscribe((param: any) => {
        this.getDt();
      });
  }
}
