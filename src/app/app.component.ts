import { Component } from '@angular/core';
import {PrintService} from './print.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false
})
export class AppComponent {
  title = 'angular-print-service';

  constructor(public printService: PrintService) { }

  onPrintInvoice(): void {
    const invoiceIds = ['101', '102'];
    this.printService
      .printDocument('invoice', invoiceIds);
  }
}
