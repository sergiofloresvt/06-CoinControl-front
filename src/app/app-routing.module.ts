import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllExpensesComponent } from './pages/all-expenses/all-expenses.component';
import { AddExpenseComponent } from './pages/add-expense/add-expense.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { SingUpComponent } from './pages/sing-up/sing-up.component';

const routes: Routes = [
 { path: '', pathMatch: 'full', redirectTo: 'login' },
 {path: 'all-expenses', component: AllExpensesComponent},
 {path:'add-expense', component: AddExpenseComponent},
 {path:'login', component: LoginComponent},
 {path: 'home', component: HomeComponent},
 {path: 'sing-up', component: SingUpComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


