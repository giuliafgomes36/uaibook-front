import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Book } from 'src/app/Book';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {
  @Output() onSubmit = new EventEmitter<Book>();
  @Input() btnText!: string;

  bookForm!: FormGroup

  private baseApiUrl = 'http://localhost:8080';
  private apiUrl = `${this.baseApiUrl}/book/categories`

  categoriasDisponiveis: Array<string> = [
    "Fantasia",
    "Mangá",
    "Ação"
  ]

  book: Book = {
    name: undefined,
    isbn: undefined,
    author: undefined,
    year: undefined,
    amount: undefined,
    publisher: undefined,
    categories: [],
  }

  constructor(private bookService: BookService) { }

  resetBook() {
    this.book = {
      name: undefined,
      isbn: undefined,
      author: undefined,
      year: undefined,
      amount: undefined,
      publisher: undefined,
      categories: [],
    }
  }

  ngOnInit(): void {
    this.bookForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl(''),
      isbn: new FormControl(''),
      author: new FormControl(''),
      year: new FormControl(''),
      amount: new FormControl(''),
      publisher: new FormControl(''),
      category: new FormControl('')
    });
  }

  submit() {
    var response = this.bookService.createBook(this.book).subscribe((r) => {
      console.log(r)
      this.resetBook()
    })
    console.log(response)
  }

  selecionarCategoria(event: any) {

    if (event.target.checked) {
      this.book.categories!.push(event.srcElement.attributes.value.textContent)
    } else {
      this.book.categories!.splice(this.book.categories!.indexOf(event.srcElement.attributes.value.textContent), 1)
    }

    console.log(event)
    console.log(this.book.categories)
  }
}
