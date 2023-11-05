import { Component, OnInit } from '@angular/core';
import { Chart, ChartType } from 'chart.js/auto';
import { Expense } from 'src/app/model/expense';
import { AuthService } from 'src/app/service/auth.service';
import 'chartjs-plugin-datalabels';

import { ExpenseService } from 'src/app/service/expense.service';
import { Category } from 'src/app/model/category';
import { GraphicService } from 'src/app/service/graphic.service';

@Component({
  selector: 'app-graphic',
  templateUrl: './graphic.component.html',
  styleUrls: ['./graphic.component.css']
})
export class GraphicComponent implements OnInit {
  public chart?: Chart;
  chartPie?: Chart

  expenses: Expense[] = [];
  chartData: any;

  categories: Category[] = []; // Asumiendo que tienes un modelo para categorías
  categoryExpensesMap: { [categoryId: number]: Expense[] } = {};



  constructor ( 
    private expenseService:ExpenseService,
    private authService: AuthService,
<<<<<<< HEAD
    // private graphicService: GraphicService
=======
   private graphicService: GraphicService
>>>>>>> Fiama5/main
    
    ){}


  ngOnInit(): void {
    const userId = this.authService.getUserIdFromLocalStorage();

    if (userId){

      this.expenseService.getAllExpenses().subscribe(data => {
        this.expenses = data;
        this.chartData = this.processData(this.expenses);
        this.createPieChart();
      });
       
    }


    
  ///


  
    // this.expenseService.getAllExpenses().subscribe(data => {
    //   this.expenses = data;
    //   this.chartData = this.processData(this.expenses);
    //   this.createPieChart();
    // });
 

    // this.graphicLine()
    // this.graphicPie()

  }

//***** */
graphicPie(){
  const data = {
    labels: [
      'Red',
      'Blue',
      'Yellow'
    ],
    datasets: [{
      label: 'My First Dataset',
      data: [300, 50, 100],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ],
      hoverOffset: 4
    }]
  };
 
  this.chartPie = new Chart("chartPie",{
    type:'pie'as ChartType,
    data: data,
  })
}
//nueva prueba 29/10 Funcionando
processData(expenses: Expense[]): any {
  const userId = this.authService.getUserIdFromLocalStorage(); // Obtén el ID del usuario logueado

  if (userId) {
    const data: ExpenseData = {};

    expenses
      .filter((expense) => expense.user.id === userId) // Cambia a expense.user.id
      .forEach((expense) => {
        const categoryKey = expense.category.name;

        if (data[categoryKey]) {
          data[categoryKey] += expense.amount;
        } else {
          data[categoryKey] = expense.amount;
        }
      });

    const labels = Object.keys(data);
    const values = Object.values(data);

    // Colores predefinidos para las secciones del gráfico
    const predefinedColors = ["#FF5733", "#33FF57", "#5733FF", "#FFFF33", "#33FFFF"];

    // Usa los colores predefinidos para las secciones del gráfico
    const backgroundColor = predefinedColors.slice(0, labels.length);

    // Si no hay datos (gastos), crea un gráfico vacío
  if (labels.length === 0) {
    labels.push("No hay gastos cargados");
    values.push(1);
    backgroundColor.push("#031f33"); // Color gris para el caso sin gastos
  }
    return {
      labels: labels,
      datasets: [
        {
          data: values,
          backgroundColor: backgroundColor,
        },
      ],
    };
  } else {
    // Maneja el caso en el que no se haya encontrado un usuario logueado.
    return null;
  }
}

/*Graficos sin % interno */
createPieChart() {
 
  const ctx = document.getElementById('myPieChart') as HTMLCanvasElement;
  const myPieChart = new Chart(ctx, {
    type: 'pie',
    data: this.chartData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true, // Puedes configurar si deseas mostrar la leyenda
          position: 'bottom', // Puedes ajustar la posición de la leyenda
        }
      },
    }
  });
}
/*Graficos sin % interno */

   // Genera colores aleatorios para las secciones del gráfico de pastel
// generateRandomColors(count: number): string[] {
//   const colors = [];
//   for (let i = 0; i < count; i++) {
//     const color = `#${Math.floor(Math.random()*16777215).toString(16)}`;
//     colors.push(color);
//   }
//   return colors;
// }


// graphicLine(){
//   const data = {
//     labels: ['enero','febrero','marzo', 'abril',
//   ],
//     datasets: [{  represeta las lines que necesitamos  
//       label: 'My First Dataset',
//       data: [65, 59, 80, 81],
//       fill: false,
//       borderColor: 'rgb(75, 192, 192)',
//       tension: 0.1
//     }]
//   };
//   this.chart = new Chart("chart",{
//     type:'line' as ChartType,
//     data
//   })
 
// }

/**Prueba 13/10 */
// processData(expenses: Expense[]): any {
//   const data: ExpenseData = {};

//   // Colores predefinidos para las secciones del gráfico
//   const predefinedColors = ["#FF5733", "#33FF57", "#5733FF", "#FFFF33", "#33FFFF"];

//   expenses.forEach((expense, index) => {
//     if (data[expense.category.name]) {
//       data[expense.category.name] += expense.amount;
//     } else {
//       data[expense.category.name] = expense.amount;
//     }
//   });

//   const labels = Object.keys(data);
//   const values = Object.values(data);

//   // Usa los colores predefinidos para las secciones del gráfico
//   const backgroundColor = predefinedColors.slice(0, labels.length);

//   return {
//     labels: labels,
//     datasets: [{
//       data: values,
//       backgroundColor: backgroundColor
//     }]
//   };
// }
//
}
interface ExpenseData {
  [category: string]: number;
}
