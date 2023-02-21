import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Loan } from 'src/app/Loan';
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

  constructor(private loanService: LoanService, private toastrService: ToastrService) { }

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
  }

 getUser() {
    this.loanService.getUser();
 }

}
