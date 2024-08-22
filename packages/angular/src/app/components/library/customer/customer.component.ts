import { Component, NgModule } from '@angular/core';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent {

}

@NgModule({
  declarations: [ CustomerComponent ],
  exports: [ CustomerComponent ]
})
export class CustomerModule { }

