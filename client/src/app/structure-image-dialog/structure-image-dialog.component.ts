import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'adme-structure-image-dialog',
  templateUrl: './structure-image-dialog.component.html',
  styleUrls: ['./structure-image-dialog.component.scss']
})
export class StructureImageDialogComponent implements OnInit {
  smiles: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.smiles = data.smiles;
  }

  ngOnInit(): void {
  }

}
