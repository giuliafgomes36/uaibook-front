import { Book } from "./Book";
import { Employee } from "./Employee";
import { User } from "./User";

export interface Loan {
  id?: number;
  loanDate?: Date;
  devolutionDate?: Date;
  isOpen?: Boolean;
  user?: User;
  employee?: Employee;
  book?: Book;
}
