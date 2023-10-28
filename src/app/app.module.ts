import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 
import { ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NavComponent } from './shared/nav/nav.component';
import { HeaderComponent } from './shared/header/header.component';
import { AddExpenseComponent } from './pages/add-expense/add-expense.component';
import { AllExpensesComponent } from './pages/all-expenses/all-expenses.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { SingUpComponent } from './pages/sing-up/sing-up.component';
import { UserService } from './service/user.service';
import { AddFundComponent } from './pages/add-fund/add-fund.component';
import { AllFundsComponent } from './pages/all-funds/all-funds.component';
import { GraphicComponent } from './pages/graphic/graphic.component';




@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavComponent,
    HeaderComponent,
    AddExpenseComponent,
    AllExpensesComponent,
    LoginComponent,
    HomeComponent,
    SingUpComponent,
    AddFundComponent,
    AllFundsComponent,
    GraphicComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
