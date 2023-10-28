import { Component, OnInit } from '@angular/core';
import { Chart, ChartType } from 'chart.js/auto';
import { Expense } from 'src/app/model/expense';
import { AuthService } from 'src/app/service/auth.service';

import { ExpenseService } from 'src/app/service/expense.service';

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

  constructor ( 
    private expenseService:ExpenseService,
    private authService: AuthService
    
    ){}


  ngOnInit(): void {
   
    this.expenseService.getAllExpenses().subscribe(data => {
      this.expenses = data;
      this.chartData = this.processData(this.expenses);
      this.createPieChart();
    });
 

    // this.graphicLine()
    // this.graphicPie()

  }

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
processData(expenses: Expense[]): any {
  const data: ExpenseData = {};

  // Colores predefinidos para las secciones del gráfico
  const predefinedColors = ["#FF5733", "#33FF57", "#5733FF", "#FFFF33", "#33FFFF"];

  expenses.forEach((expense, index) => {
    if (data[expense.category.name]) {
      data[expense.category.name] += expense.amount;
    } else {
      data[expense.category.name] = expense.amount;
    }
  });

  const labels = Object.keys(data);
  const values = Object.values(data);

  // Usa los colores predefinidos para las secciones del gráfico
  const backgroundColor = predefinedColors.slice(0, labels.length);

  return {
    labels: labels,
    datasets: [{
      data: values,
      backgroundColor: backgroundColor
    }]
  };
}


generateRandomColors(count: number): string[] {
  // Genera colores aleatorios para las secciones del gráfico de pastel
  const colors = [];
  for (let i = 0; i < count; i++) {
    const color = `#${Math.floor(Math.random()*16777215).toString(16)}`;
    colors.push(color);
  }
  return colors;
}

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
          position: 'top', // Puedes ajustar la posición de la leyenda
        }
      },
    }
  });
}


}
interface ExpenseData {
  [category: string]: number;
}
