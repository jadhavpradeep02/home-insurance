import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json", 'Access-Control-Allow-Origin':'*' })
};

const postOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json",'Accept': 'application/json', 'Access-Control-Allow-Origin':'*' })
}

@Injectable({
  providedIn: 'root'
})
export class QuoteService {
  public static BaseUrl = "http://localhost:3000/";

  private data = {};
  private messageSource = new BehaviorSubject(this.data);
  currentMessage = this.messageSource.asObservable();
  
  constructor(private http: HttpClient) {
  }

  getQuoteData() {
    return this.http.get(QuoteService.BaseUrl+'quotes', httpOptions).pipe(map((response) => {
      this.data = response;
      this.messageSource.next(this.data);
      return this.data;
    }))
  }

  postQuoteData(data: any){
    return this.http.post(QuoteService.BaseUrl+'quotes', data, postOptions).pipe(response => response);
  }

  updateData(data) {
    console.log(data);
    this.messageSource.next(data);
  }
}
