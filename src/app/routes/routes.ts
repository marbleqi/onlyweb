import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutBasicComponent } from '../layout';

export const routes: Routes = [
  {
    path: '',
    component: LayoutBasicComponent,
    data: {},
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'apisix', loadChildren: () => import('./apisix/routes').then(m => m.routes) }
    ]
  },
  // passport
  { path: 'exception', loadChildren: () => import('./exception/routes').then(m => m.routes) },
  { path: '**', redirectTo: 'exception/404' }
];
