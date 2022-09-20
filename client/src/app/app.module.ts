import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SketcherModule } from './sketcher/sketcher.module';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { PredictionsComponent } from './predictions/predictions.component';
import { MethodComponent } from './method/method.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FileSelectDirective } from './utilities/file-select.directive';
import { TextFileComponent } from './text-file/text-file.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingComponent } from './loading/loading.component';
import { MatListModule } from '@angular/material/list';
import { StructureImageDirective } from './structure-image/structure-image.directive';
import { StructureImageDialogComponent } from './structure-image-dialog/structure-image-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { ContactComponent } from './contact/contact.component';
import { PredictionsTableComponent } from './predictions-table/predictions-table.component';
import { ConfigService } from './config/config.service';
import { configServiceFactory } from './config/config.factory';
import { TrackLinkEventDirective } from './google-analytics/track-link-event/track-link-event.directive';
import { MatMenuModule } from '@angular/material/menu';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { APP_BASE_HREF, PlatformLocation } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PredictionsComponent,
    MethodComponent,
    PageNotFoundComponent,
    FileSelectDirective,
    TextFileComponent,
    LoadingComponent,
    StructureImageDirective,
    StructureImageDialogComponent,
    ContactComponent,
    PredictionsTableComponent,
    TrackLinkEventDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SketcherModule,
    MatTableModule,
    MatPaginatorModule,
    HttpClientModule,
    MatButtonModule,
    MatToolbarModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTabsModule,
    MatInputModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatDialogModule,
    MatSortModule,
    MatTooltipModule,
    MatIconModule,
    MatMenuModule,
    MatRadioModule,
    MatCheckboxModule
  ],
  entryComponents: [
    StructureImageDialogComponent
  ],
  providers: [
    ConfigService,
    {
        provide: APP_INITIALIZER,
        useFactory: configServiceFactory,
        deps: [ConfigService],
        multi: true
    },
    {
      provide: APP_BASE_HREF,
      useFactory: (s: PlatformLocation) => s.getBaseHrefFromDOM(),
      deps: [PlatformLocation]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
