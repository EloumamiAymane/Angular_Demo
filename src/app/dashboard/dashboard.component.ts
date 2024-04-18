import { Component } from '@angular/core';
import {AppStateService} from "../services/app-state.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
constructor(public  appState:AppStateService) {
}
  totalCheckedProducts(){
  let checkedproducts = this.appState.productState.products.filter((p:any)=>p.checked)
    return checkedproducts.length
}
}
