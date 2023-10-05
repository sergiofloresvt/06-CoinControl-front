import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/model/category';
import { Expense } from 'src/app/model/expense';
import { Funds } from 'src/app/model/funds';
import { AuthService } from 'src/app/service/auth.service';
import { ExpenseService } from 'src/app/service/expense.service';
import { FundsService } from 'src/app/service/funds.service';


@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css']
})
export class AddExpenseComponent implements OnInit {

   //Expense inicialización
  expense: Expense = {
    id: 0,
    amount: 0,
    description: '',
    date: '',
    category: {
      id: 0,
      name: '',
      icons: '',
      color: ''
    },
    user: {
      id: 0,
      username: '',
      password: '',
      name: '',
      email: ''
    },
    funds: {
      id: 0,
      amount: 0,
      user: {
        id: 0,
        username: '',
        password: '',
        name: '',
        email: ''
      },
      predefinedFund: {
        id: 0,
        name: ''
      }

    }

  };

  categories: Category[] = [];
  selectedCategoryId: number = 0;

  fundsList: Funds[] = []; // Lista de fondos
  selectedFundsId: number | undefined; // Fondo seleccionado
  constructor(
    private expenseService: ExpenseService,
    private authService: AuthService,
    private fundsService: FundsService
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

       // Llamar al servicio de fondos para obtener los fondos del usuario
       this.fundsService.getFundsByUserId(userId).subscribe(
        (funds: Funds[]) => {
          // Manejar los fondos obtenidos aquí
          console.log('Fondos del usuario:', funds);
          this.fundsList = funds;
        },
        error => {
          console.error('Error al obtener los fondos del usuario:', error);
        }
      );
    }
  }
    //Metodo para verificiar si el id de funds cambia, para manejar errrores
    onFundsChange() {
      console.log('Fondo seleccionado:', this.selectedFundsId);
    }
  

  

  submitForm() {
    const categoryId = this.selectedCategoryId; 
    // Se Obtiene el categoryId de la lista desplegable
    const fundsId = Number(this.selectedFundsId); 
     // Se obtiene el fundsId de la lista desplegable

      // Asigna el valor de fundsId
    this.expense.funds.id = fundsId;

    //Imprime los datos que se enviarian por la consola del browser
    console.log('Datos a enviar:', this.expense);

    this.expenseService.addExpense(this.expense, categoryId, fundsId ).subscribe(() => {
      // Limpia el formulario después de agregar el gasto
      this.expense = {
        id: 0,
        amount: 0,
        description: '',
        date: '',
        category: {
          id: 0,
          name: '',
          icons: '',
          color: ''
        },
        user: {
          id: this.expense.user.id, // Mantén el user_id después de la inserción
          username: '',
          password: '',
          name: '',
          email: ''
        }, funds: {
          id: 0,
          amount: 0,
          user: {
            id: 0,
            username: '',
            password: '',
            name: '',
            email: ''
          },
          predefinedFund: {
            id: 0,
            name: ''
          }

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
