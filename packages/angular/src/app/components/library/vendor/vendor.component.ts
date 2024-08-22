import { Component, NgModule } from '@angular/core';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.scss']
})
export class VendorComponent {

}

@NgModule({
  declarations: [ VendorComponent ],
  exports: [ VendorComponent ]
})
export class VendorModule { }
