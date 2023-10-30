import { Component, OnInit } from '@angular/core';
import { Funds } from 'src/app/model/funds';
import { AuthService } from 'src/app/service/auth.service';
import { FundsService } from 'src/app/service/funds.service';
@Component({
  selector: 'app-all-funds',
  templateUrl: './all-funds.component.html',
  styleUrls: ['./all-funds.component.css']
})
export class AllFundsComponent implements OnInit {

  IdFunds: Funds []=[]

  constructor( 
    private fundsService:FundsService,
    private authService:AuthService
  ){}
  ngOnInit(): void {
    this.getFundsById()
  }


  getFundsById(){

    const userId= this.authService.getUserIdFromLocalStorage();

    if(userId !== null){
      this.fundsService.getFundsByUserId(userId).subscribe((data)=>{

        this.IdFunds = data;
      })
    }
  }
}
