import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { LayoutBasicComponent } from '../layout';

export const routes: Routes = [
  {
    path: '',
    component: LayoutBasicComponent,
    data: {},
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent, data: { reuse: false } },
      { path: 'dashboard', component: DashboardComponent, data: { reuse: false } },
      { path: 'apisix', loadChildren: () => import('./apisix/routes').then(m => m.routes) },
      { path: 'aliyun', loadChildren: () => import('./aliyun/routes').then(m => m.routes) },
      { path: 'setting', loadChildren: () => import('./setting/routes').then(m => m.routes) }
    ]
  },
  // passport
  { path: 'exception', loadChildren: () => import('./exception/routes').then(m => m.routes) },
  { path: '**', redirectTo: 'exception/404' }
];
