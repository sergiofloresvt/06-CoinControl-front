import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Expense } from '../model/expense';
import { Category } from '../model/category';



@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }


  addExpense(expense: Expense, categoryId: number, fundsId: number): Observable<Expense> {
    expense.category.id = categoryId;
    // Agrega fundsId como un parámetro en la URL
    return this.http.post<Expense>(`${this.baseUrl}/expense/add?fundsId=${fundsId}`, expense);
  }
  


  // Método para obtener los gastos de un usuario y una categoría específicos
  getExpensesByUserAndCategory(userId: number, categoryId: number): Observable<Expense[]> {
    return this.http.get<Expense[]>(`${this.baseUrl}/expense/find/user/${userId}/category/${categoryId}`);
  }
    
  //Traer categorias
  getCategorys(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/category/all`);
  }

  //Borrar un gasto
  deleteExpense(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/expense/delete/${id}`);
  }

  //Traer todos los gastos
  getAllExpenses(): Observable<Expense[]> {
    return this.http.get<Expense[]>(`${this.baseUrl}/expense/all`);
  }

}
