import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
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
  btnText: string = "Salvar"

  bookForm!: FormGroup
  disableFixedFields: boolean = false

  private baseApiUrl = 'http://localhost:8080';
  private apiUrl = `${this.baseApiUrl}/book/categories`

  books: Book[] = []
  categoriasDisponiveis: string[] = []

  displayedBook: Book = {
    id: undefined,
    name: undefined,
    isbn: undefined,
    authors: undefined,
    year: undefined,
    amount: undefined,
    publisher: undefined,
    categories: [],
  }

  constructor(private bookService: BookService, private toastrService: ToastrService) { }

  resetBook() {
    this.displayedBook = {
      name: undefined,
      isbn: undefined,
      authors: undefined,
      year: undefined,
      amount: undefined,
      publisher: undefined,
      categories: [],
    }

    this.updateCategories()
  }

  ngOnInit(): void {
    this.bookForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl(''),
      isbn: new FormControl(''),
      authors: new FormControl(''),
      year: new FormControl(''),
      amount: new FormControl(''),
      publisher: new FormControl(''),
      category: new FormControl('')
    });

    this.getBooks()
    this.getCategories()
  }

  submit() {
    // var response = this.bookService.createBook(this.displayedBook).subscribe((r) => {
    //   console.log(r)
    //   this.resetBook()
    // })
  }

  getCategories() {
    var response = this.bookService.getCategorias()
    response.subscribe(c => {
      this.categoriasDisponiveis = []
      this.categoriasDisponiveis = this.categoriasDisponiveis.concat(c)
    })
  }

  getBooks() {
    var response = this.bookService.getBooks()
    response.subscribe(b => {
      this.books = []
      this.books = this.books.concat(b)
    })
  }

  selecionarCategoria(event: any) {

    if (event.target.checked) {
      this.displayedBook.categories!.push(event.srcElement.attributes.value.textContent)
    } else {
      this.displayedBook.categories!.splice(this.displayedBook.categories!.indexOf(event.srcElement.attributes.value.textContent), 1)
    }
  }

  resetCategories() {
    this.categoriasDisponiveis!.forEach(category => {
      var element: any = document.getElementById(category)
      element.checked = false
    })
  }

  updateCategories() {
    this.resetCategories()
    this.displayedBook.categories!.forEach(category => {
      var element: any = document.getElementById(category)
      element.checked = true
    });
  }

  updateSaveButton() {
    if (this.displayedBook.id != undefined) {
      this.btnText = "Atualizar"
    } else {
      this.btnText = "Salvar"
    }
  }

  saveOrUpdate() {


    // UPDATE
    console.log(this.displayedBook)
    if (this.displayedBook.id != undefined) {
      this.bookService.updateBook(this.displayedBook).subscribe(r => {
        if (r.errors != undefined && r.errors.length > 0) {
          for (const error in r.errors) {
            console.log(error)
            this.toastrService.error(error)
          }
        } else {
          this.toastrService.success(`Livro ${r.data.name} alterado`)
          this.resetBook()
          this.getBooks()
        }
      }, response => {
        for (const e of response.error.errors) {
          this.toastrService.error(e)
        }
      })
    }


    // SAVE
    if (this.displayedBook.id == undefined) {
      this.bookService.createBook(this.displayedBook).subscribe(r => {
        if (r.errors != undefined && r.errors.length > 0) {
          for (const error in r.errors) {
            console.log(error)
            this.toastrService.error(error)
          }
        } else {
          this.toastrService.success(`Livro ${r.data.name} cadastrado`)
          this.resetBook()
          this.getBooks()
        }
      }, response => {
        console.log(response)
        for (const e of response.error.errors) {
          this.toastrService.error(e)
        }
      })
    }
  }

  delete() {
    if (this.displayedBook.id != undefined) {
      var response = this.bookService.deleteBook(this.displayedBook).subscribe((r: any, a: any) => {
        console.log(r)
        if (r.status == HttpStatusCode.Ok) {
          this.toastrService.success(`Livro excluído.`)
          this.resetBook()
          this.getBooks()
        } else {
          this.toastrService.success(`Não foi possível excluir o livro.`)
        }
      })
    }
    else {
      this.toastrService.error(`Selecione um livro para excluir.`)
    }
  }

  new() {
    this.resetBook()
  }

  selectBook(book: Book) {
    this.displayedBook = structuredClone(book)
    this.updateCategories()
  }
}
