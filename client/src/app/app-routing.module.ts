import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PredictionsComponent } from './predictions/predictions.component';
import { MethodComponent } from './method/method.component';
import { ContactComponent } from './contact/contact.component';
import { DataComponent } from './data/data.component';
import { SwaggerComponent } from './swagger-ui/swagger-ui.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    data: {
      pageTitle: 'home'
    }
  },
  {
    path: 'predictions',
    component: PredictionsComponent,
    data: {
      pageTitle: 'predictions'
    }
  },
  {
    path: 'models/:model',
    component: MethodComponent,
    data: {
      pageTitle: 'model'
    }
  },
  {
    path: 'data',
    component: DataComponent,
    data: {
      pageTitle: 'data'
    }
  },
  {
    path: 'swagger-ui',
    component: SwaggerComponent,
    data: {
      pageTitle: 'swagger-ui'
    }
  },
  {
    path: 'contact',
    component: ContactComponent,
    data: {
      pageTitle: 'contact'
    }
  },
  {
    path: '**',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
