import { Component } from '@angular/core';
import { Category } from 'src/app/model/category';
import { Expense } from 'src/app/model/expense';
import { ExpenseService } from 'src/app/service/expense.service';
import { AuthService } from 'src/app/service/auth.service';
import { Chart, ChartType } from 'chart.js/auto';

@Component({
  selector: 'app-all-expenses',
  templateUrl: './all-expenses.component.html',
  styleUrls: ['./all-expenses.component.css']
})
export class AllExpensesComponent {

  categoryExpensesMap: { [key: number]: Expense[] } = {};
  expandedCategories: { [key: number]: boolean } = {};
  categories: Category[] = [];
  chartPie?:Chart
  constructor(private expenseService: ExpenseService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    
    this.loadCategories();
  }

  loadCategories() {
    // Llama al servicio para cargar la lista de categorías
    this.expenseService.getCategorys().subscribe((categories) => {
      this.categories = categories;

      // Luego, por cada categoría, carga los gastos relacionados
      this.categories.forEach((category) => {
        this.loadExpensesByCategory(category.id);
      });
     
    });
  }

  loadExpensesByCategory(categoryId: number) {
    const userId = this.authService.getUserIdFromLocalStorage();

    if (userId !== null) {
      this.expenseService.getExpensesByUserAndCategory(userId, categoryId).subscribe((expenses) => {
        this.categoryExpensesMap[categoryId] = expenses;
      });
    } else {
      // Manejar el caso en el que userId es null

      this.categoryExpensesMap[categoryId] = [];
    }
  }

  // Función para eliminar un gasto
  deleteExpense(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este gasto?')) {
      this.expenseService.deleteExpense(id).subscribe(() => {
        // Después de eliminar con éxito, puedes volver a cargar los gastos
        this.loadCategories();
      });
    }
  }
  //Funcion para desplegar la lista de gastos de una categoria
  toggleCategory(categoryId: number) {
    this.expandedCategories[categoryId] = !this.expandedCategories[categoryId];

  }

// Función para verificar si una categoría tiene gastos asociados
categoryHasExpenses(categoryId: number): boolean {
  return !!this.categoryExpensesMap[categoryId] && this.categoryExpensesMap[categoryId].length > 0;
}

  

}
