import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NewService {
  private baseUrl = 'https://jsonplaceholder.typicode.com/posts';
  constructor(private httpClient: HttpClient) {}
  getAccountants(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}`);
  }
}
