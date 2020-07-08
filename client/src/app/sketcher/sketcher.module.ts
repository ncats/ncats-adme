import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SketcherComponent } from './sketcher.component';



@NgModule({
  declarations: [
    SketcherComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SketcherComponent
  ]
})
export class SketcherModule { }
