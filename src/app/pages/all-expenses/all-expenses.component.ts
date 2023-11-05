import { Component } from '@angular/core';
import { Category } from 'src/app/model/category';
import { Expense } from 'src/app/model/expense';
import { ExpenseService } from 'src/app/service/expense.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-all-expenses',
  templateUrl: './all-expenses.component.html',
  styleUrls: ['./all-expenses.component.css']
})
export class AllExpensesComponent {

  //Variable que se le va a pasar por paramatros el id de la categoria y los gastos de esa categoria para que los guarde, se utiliza en la funcion loadExpensesByCategory
  categoryExpensesMap: { [key: number]: Expense[] } = {};

  categoryTotalExpenses: { [key: string]: number } = {}; //Variable para traer el total de la categoria
  expandedCategories: { [key: number]: boolean } = {};
  categories: Category[] = [];
<<<<<<< HEAD
  chartPie?:Chart
  constructor(
    private expenseService: ExpenseService,
=======
  constructor(private expenseService: ExpenseService,
>>>>>>> Fiama5/main
    private authService: AuthService
  ) { }

  ngOnInit(): void {

    this.loadCategories();
    this.getSumOfExpensesByCategoryForUser();
  }

  loadCategories() {
    // Llama al servicio 'expenseService' para obtener la lista de categorías.
    this.expenseService.getCategorys().subscribe((categories) => {
      // Una vez obtenidas las categorías, se asignan a la variable 'this.categories'.
      this.categories = categories;

      // Luego, para cada categoría obtenida, se procede a cargar los gastos relacionados.
      this.categories.forEach((category) => {
        // Para cada categoría, se llama a la función 'loadExpensesByCategory' pasando el ID de la categoría.
        this.loadExpensesByCategory(category.id);
      });
    });
  }


  //Esta función tiene como objetivo cargar y organizar los gastos de un usuario correspondiente al servicio `authService`, utilizando el método `getUserIdFromLocalStorage()`, 
  //junto con una categoría específica. El proceso implica la creación de arrays utilizando un mapeo donde la clave (key) es el ID de la categoría. 
  //Esto se realiza para recopilar y mostrar los gastos relacionados con esa categoría y ese usuario.
  loadExpensesByCategory(categoryId: number) {
    // Se intenta obtener el ID del usuario que ha iniciado sesión mediante el método `getUserIdFromLocalStorage()` del servicio `authService`.
    const userId = this.authService.getUserIdFromLocalStorage();

    if (userId !== null) { // Verifica que user id no sea nulo
      this.expenseService.getExpensesByUserAndCategory(userId, categoryId).subscribe((expenses) => {
        //Usa el servicio para obtener los gastos de un usuario, (UserId del que se logueo) y una categoría específicos, luego se suscribe a los datos devueltos por el servicio
        this.categoryExpensesMap[categoryId] = expenses;
        //Una vez se reciben los gastos correspondientes, estos se asignan al mapa de gastos `categoryExpensesMap`, utilizando el ID de la categoría como clave(key). 
        //Esta estructura se utiliza posteriormente, por ejemplo, en un ciclo `ngFor` para mostrar los gastos de esa categoría.
        console.log("CategoryExpensesMap", this.categoryExpensesMap)
        // Console log se utilizo para entender como funcionaba la función
      });
    } else {
      //Si no se pudo obtener el userId, la función asigna un array vacío this.categoryExpensesMap[categoryId] = []; a la categoría específica en el mapa de gastos.
      this.categoryExpensesMap[categoryId] = [];
    }
  }

  // Función para eliminar un gasto
  deleteExpense(id: number) {
    // Se comprueba si el usuario confirma la eliminación del gasto utilizando la función confirm() del navegador.
    if (confirm('¿Estás seguro de que deseas eliminar este gasto?')) {
      // Si el usuario confirma la eliminación, se procede a llamar al servicio 'expenseService' para eliminar el gasto mediante su ID.
      this.expenseService.deleteExpense(id).subscribe(() => {
        // Después de eliminar con éxito se invoca la función 'loadCategories()' para volver a cargar los gastos, para reflejar los cambios tras la eliminación.
        this.loadCategories();
      });
    }
  }



  //Funcion para desplegar la lista de gastos de una categoria
  toggleCategory(categoryId: number) {
    this.expandedCategories[categoryId] = !this.expandedCategories[categoryId];

  }

<<<<<<< HEAD
  
=======
  // Función para verificar si una categoría tiene gastos asociados
  categoryHasExpenses(categoryId: number): boolean {
    return !!this.categoryExpensesMap[categoryId] && this.categoryExpensesMap[categoryId].length > 0;
  }
>>>>>>> Fiama5/main


  //Metodo para traer el total de la categoria
  getSumOfExpensesByCategoryForUser() {
    const userId = this.authService.getUserIdFromLocalStorage();
    if (userId !== null) {
      this.expenseService.getSumOfExpensesByCategory(userId).subscribe((categoryTotals: Map<string, number> | any) => {
        if (categoryTotals instanceof Map) {
          this.categoryTotalExpenses = {};
          categoryTotals.forEach((value, key) => {
            this.categoryTotalExpenses[key] = value;
          });
        } else if (typeof categoryTotals === 'object' && categoryTotals !== null) {
          this.categoryTotalExpenses = categoryTotals;
        } else {
          console.error('Los datos recibidos no son un objeto válido.');
        }
      });
    } else {
      console.error('userID es nulo.');
    }



  }
}
