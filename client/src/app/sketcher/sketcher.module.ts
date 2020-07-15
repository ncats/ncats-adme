import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SketcherComponent } from './sketcher.component';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    SketcherComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule
  ],
  exports: [
    SketcherComponent
  ]
})
export class SketcherModule { }
