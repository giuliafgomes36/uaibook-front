import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Loan } from 'src/app/Loan';
import { User } from 'src/app/User';
import { Book } from 'src/app/Book';
import { Employee } from 'src/app/Employee';
import { LoanService } from 'src/app/services/loan.service';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.css'],
})
export class LoanComponent implements OnInit{
  @Output() onSubmit = new EventEmitter<Loan>();
  btnText: string = "Salvar"

  loanForm!: FormGroup
  disableFixedFields: boolean = false

  private baseApiUrl = 'http://localhost:8080';

  loans: Loan[] = []
  users: User[] = []
  employee: Employee[] = []
  books: Book[] = []

  displayedLoan: Loan = {
    id: undefined,
    loanDate: undefined,
    devolutionDate: undefined,
    isOpen: undefined,
    user: undefined,
    employee: undefined,
    book: undefined,
  }

  constructor(private loanService: LoanService, private bookService: BookService,private toastrService: ToastrService) { }

  resetLoan() {
    this.displayedLoan = {
      id: undefined,
      loanDate: undefined,
      devolutionDate: undefined,
      isOpen: undefined,
      user: undefined,
      employee: undefined,
      book: undefined,
    }
  }

  ngOnInit(): void {
      this.loanForm = new FormGroup({
        id: new FormControl(''),
        user: new FormControl(''),
        employee: new FormControl(''),
        book: new FormControl(''),
        loanDate: new FormControl(''),
        devolutionDate: new FormControl(''),
        isOpen: new FormControl('')
      })

      this.getUser();
      this.getEmployee();
      this.getBooks();
  }

  getUser() {
    var response = this.loanService.getUser()
    response.subscribe(c => {
      this.users = []
      this.users = this.users.concat(c)
    })
  }
  
  getEmployee() {
    var response = this.loanService.getEmployee()
    response.subscribe(c => {
      this.employee = []
      this.employee = this.employee.concat(c)
    })
  }

  getBooks() {
    var response = this.bookService.getBooks()
    response.subscribe(b => {
      this.books = []
      this.books = this.books.concat(b)
    })
  }

  getLoans() {
    var response = this.loanService.getLoan()
    response.subscribe(b => {
      this.loans = []
      this.loans = this.loans.concat(b)
    })
  }

  updateSaveButton() {
    if (this.displayedLoan.id != undefined) {
      this.btnText = "Atualizar"
    } else {
      this.btnText = "Salvar"
    }
  }

  saveOrUpdate() {

    // UPDATE
    console.log(this.displayedLoan)
    if (this.displayedLoan.id != undefined) {
      this.loanService.updateLoan(this.displayedLoan).subscribe(r => {
        if (r.errors != undefined && r.errors.length > 0) {
          for (const error in r.errors) {
            console.log(error)
            this.toastrService.error(error)
          }
        } else {
          this.toastrService.success(`Devolução confirmada`)
          this.resetLoan()
          this.getLoans()
        }
      }, response => {
        for (const e of response.error.errors) {
          this.toastrService.error(e)
        }
      })
    }

    // SAVE
    if (this.displayedLoan.id == undefined) {
      console.log(this.displayedLoan)
      this.loanService.createLoan(this.displayedLoan).subscribe(r => {
        if (r.errors != undefined && r.errors.length > 0) {
          for (const error in r.errors) {
            console.log(error)
            this.toastrService.error(error)
          }
        } else {
          this.toastrService.success(`Empréstimo cadastrado em nome de ${r.data.user}`)
          this.resetLoan()
          this.getLoans()
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
    if (this.displayedLoan.id != undefined) {
      var response = this.loanService.deleteLoan(this.displayedLoan).subscribe((r: any, a: any) => {
        console.log(r)
        if (r.status == HttpStatusCode.Ok) {
          this.toastrService.success(`Livro excluído.`)
          this.resetLoan()
          this.getLoans()
        } else {
          this.toastrService.success(`Não foi possível excluir o livro.`)
        }
      })
    }
    else {
      this.toastrService.error(`Selecione um livro para excluir.`)
    }
  }

  new(){
    this.resetLoan()
  }

  selectLoan(loan: Loan) {
    this.displayedLoan = structuredClone(loan)
  }
}
