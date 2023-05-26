import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class BookService {
  private apiUrl = 'https://openlibrary.org'; // Base URL for Open Library API

    constructor(private http: HttpClient) {}

    searchBooks(searchText: string, page: number): Observable<any> {
    const params = new HttpParams()
        .set('q', searchText)
        .set('page', String(page))
        .set('limit', '10');

    return this.http.get(`${this.apiUrl}/search.json`, { params });
}
}
