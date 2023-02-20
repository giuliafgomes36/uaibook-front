import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../Book';
import { Response } from '../Response';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private baseApiUrl = 'localhost:8080';
  private apiUrl = `${this.baseApiUrl}/book`
  private categoriesUrl = `${this.apiUrl}/categories`

  constructor(private http: HttpClient) { }

  createBook(book: Book): Observable<any> {
    return this.http.post(this.apiUrl, book);
  }

  getBooks(): Observable<Response<Book[]>> {
    return this.http.get<Response<Book[]>>(this.apiUrl);
  }

  getCategorias(): any {
    this.http.get<string[]>(this.categoriesUrl).subscribe((p) => {
      console.log(p)
    })
    //console.log(lista)
  }
}
