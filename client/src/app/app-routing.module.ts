import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PredictionsComponent } from './predictions/predictions.component';
import { MethodComponent } from './method/method.component';
import { ContactComponent } from './contact/contact.component';

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
    path: 'method',
    component: MethodComponent,
    data: {
      pageTitle: 'model'
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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
