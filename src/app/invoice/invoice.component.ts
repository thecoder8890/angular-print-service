import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PrintService} from '../print.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
  standalone: false
})
export class InvoiceComponent implements OnInit {
  invoiceIds: string[] = [];
  invoiceDetails: Promise<{ amount: number }>[] = [];

  constructor(route: ActivatedRoute,
              private printService: PrintService) {
    const invoiceIdsParam = route.snapshot.params['invoiceIds'] || '';
    this.invoiceIds = invoiceIdsParam
      .split(',')
      .filter((id: string) => /^[a-zA-Z0-9_-]+$/.test(id));
  }

  ngOnInit(): void {
    if (this.invoiceIds.length === 0) {
      return;
    }

    this.invoiceDetails = this.invoiceIds
      .map(id => this.getInvoiceDetails(id));
    Promise.all(this.invoiceDetails)
      .then(() => this.printService.onDataReady());
  }

  getInvoiceDetails(invoiceId: string): Promise<{ amount: number }> {
    void invoiceId;
    const amount = Math.floor((Math.random() * 100));
    return new Promise(resolve =>
      setTimeout(() => resolve({amount}), 1000)
    );
  }

}
