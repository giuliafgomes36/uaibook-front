import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Loan } from 'src/app/Loan';
import { User } from 'src/app/User';
import { Employee } from 'src/app/Employee';
import { LoanService } from 'src/app/services/loan.service';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.css']
})
export class LoanComponent implements OnInit{
  @Output() onSubmit = new EventEmitter<Loan>();
  btnText: string = "Salvar"

  loanForm!: FormGroup
  disableFixedFields: boolean = false

  private baseApiUrl = 'http://localhost:8080';

  loans: Loan[] =[]
  users: User[] = []
  employee: Employee[] = []

  displayedLoan: Loan = {
    id: undefined,
    loanDate: undefined,
    devolutionDate: undefined,
    isOpen: undefined,
    user: undefined,
    employee: undefined,
    book: undefined,
  }

  constructor(private loanService: LoanService, private toastrService: ToastrService) { }

  ngOnInit(): void {
      this.loanForm = new FormGroup({
        id: new FormControl(''),
        user: new FormControl(''),
        employee: new FormControl(''),
        book: new FormControl(''),
        loanDate: new FormControl(''),
        devolutionDate: new FormControl(new Date(), []),
        isOpen: new FormControl('')
      })
  }

 getUser() {
    let a = this.loanService.getUser();
    // a.subscribe(d => {
    //   let g = d
    // })
    console.log(a)
} 
}
