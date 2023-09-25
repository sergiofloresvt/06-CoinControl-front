import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/model/category';
import { Expense } from 'src/app/model/expense';
import { AuthService } from 'src/app/service/auth.service';
import { ExpenseService } from 'src/app/service/expense.service';


@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css']
})
export class AddExpenseComponent implements OnInit {

  
  expense: Expense = {
    id: 0,
    amount: 0,
    description: '',
    date: '',
    category: {
      id: 0,
      name: ''
    },
    user: {
      id: 0,
      username: '',
      password: '',
      name: '',
      email: ''
    }
  };

  categories: Category[] = [];
  selectedCategoryId: number = 0;

  constructor(
    private expenseService: ExpenseService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    // Llamar al servicio para obtener la lista de categorías
    this.expenseService.getCategorys().subscribe(categories => {
      this.categories = categories;
    });

    // Obtener el user_id del servicio de autenticación
    const userId = this.authService.getUserIdFromLocalStorage();
    if (userId) {
      this.expense.user.id = userId;
    }
  }

  submitForm() {
    const categoryId = this.selectedCategoryId; // Se Obtiene el categoryId de la lista desplegable

    //Imprime los datos que se enviarian por la consola del browser
    console.log('Datos a enviar:', this.expense);

    this.expenseService.addExpense(this.expense, categoryId).subscribe(() => {
      // Limpia el formulario después de agregar el gasto
      this.expense = {
        id: 0,
        amount: 0,
        description: '',
        date: '',
        category: {
          id: 0,
          name: ''
        },
        user: {
          id: this.expense.user.id, // Mantén el user_id después de la inserción
          username: '',
          password: '',
          name: '',
          email: ''
        }
      };
      this.selectedCategoryId = 0; // Reinicia la selección de categoría
    });
  }

selectCategory(category: any) {
  // Tu lógica para seleccionar la categoría aquí
  this.selectedCategoryId = category.id;
}
}
