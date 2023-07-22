import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Position } from '../models/employee-position';

@Injectable({
  providedIn: 'root',
})
export class PositionService {
  private apiUrl =
    'http://localhost:3000/Positions'; // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  getPositions(): Observable<Position[]> {
    return this.http.get<Position[]>(this.apiUrl);
  }

  getPosition(id: number): Observable<Position> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Position>(url);
  }

  createPosition(position: Position): Observable<Position> {
    return this.http.post<Position>(this.apiUrl, position);
  }

  updatePosition(position: Position, id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, position);
  }

  deletePosition(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}
