import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/Book';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  btnText = 'Salvar';

  constructor(private bookService: BookService) {}

  ngOnInit(): void {}

  async createHandler(book: Book) {
    const bookJson = JSON;

    bookJson.stringify(book);

    //eviar para service

    //exibir mnsg

    //redirect


  }

}
