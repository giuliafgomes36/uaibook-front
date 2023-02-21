import { HttpClient, HttpResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Loan } from '../Loan';
import { Response } from '../Response';
import { User } from '../User';
import { Employee } from '../Employee';
import { map, catchError } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  private baseApiUrl = 'http://localhost:8080';
  private apiUrl = `${this.baseApiUrl}/loan`
  private userUrl = `${this.baseApiUrl}/user`
  private employeeUrl = `${this.baseApiUrl}/empl`


  constructor(private http: HttpClient) { }

  createLoan(loan: Loan): Observable<Response<Loan>>{
    return this.http.post<Response<Loan>>(this.apiUrl, loan);
  }

  getLoan(): Observable<Loan[]>{
    return this.http.get<Loan[]>(this.apiUrl);
  }

  updateLoan(loan: Loan): Observable<Response<Loan>>{
    return this.http.put<Response<Loan>>(this.apiUrl + "/" + loan.id, loan)
  }
  
  deleteLoan(loan: Loan): any {
    return this.http.delete(this.apiUrl + "/" + loan.id, { observe: 'response' })
  }

  getUser(): string[] {
    let names:string[] = []
    this.http.get<Array<any>>(this.userUrl).subscribe(b => {
        b.map(c => {
        console.log(c.name)
        names.push(c.name)
      })
    })
    console.log(names)
    return names
    // let names = users.forEach((next) => next.map((user) => user.name)).then( (user) => console.log(user))
    // // console.log(names);
    // return name;
  }

}


