import { HttpClient, HttpResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../Book';
import { Response } from '../Response';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private baseApiUrl = 'http://localhost:8080';
  private apiUrl = `${this.baseApiUrl}/book`
  private categoriesUrl = `${this.apiUrl}/categories`

  constructor(private http: HttpClient) { }

  createBook(book: Book): Observable<Response<Book>> {
    return this.http.post<Response<Book>>(this.apiUrl, book);
  }

  updateBook(book: Book): Observable<Response<Book>> {
    return this.http.put<Response<Book>>(this.apiUrl + "/" + book.id, book)
  }

  deleteBook(book: Book): any {
    return this.http.delete(this.apiUrl + "/" + book.id, { observe: 'response' })
  }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl);
  }

  getCategorias(): Observable<string[]> {
    return this.http.get<string[]>(this.categoriesUrl)
  }
}
