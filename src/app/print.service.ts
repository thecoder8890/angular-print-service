import { Injectable } from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PrintService {
  isPrinting = false;
  private readonly printableDocuments = new Set(['invoice']);

  constructor(private router: Router) { }

  printDocument(documentName: string, documentData: readonly string[]): void {
    if (!this.printableDocuments.has(documentName)) {
      return;
    }

    const safeDocumentData = documentData
      .filter((id) => /^[a-zA-Z0-9_-]+$/.test(id));

    if (safeDocumentData.length === 0) {
      return;
    }

    this.isPrinting = true;
    this.router.navigate(['/',
      { outlets: {
        'print': ['print', documentName, safeDocumentData.join(',')]
      }}]);
  }

  onDataReady(): void {
    setTimeout(() => {
      window.print();
      this.isPrinting = false;
      this.router.navigate([{ outlets: { print: null }}]);
    });
  }
}
