import { Routes } from '@angular/router';

import {
  ApisixInstanceService,
  ApisixDashboardService,
  ApisixRouteService,
  ApisixSslService,
  ApisixInstanceComponent,
  ApisixDashboardComponent,
  ApisixRouteComponent,
  ApisixSslComponent,
  ApisixInstanceEditComponent
} from '.';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'prefix',
    providers: [ApisixInstanceService, ApisixDashboardService, ApisixRouteService, ApisixSslService],
    children: [
      { path: '', redirectTo: 'instance', pathMatch: 'full' },
      { path: 'instance', component: ApisixInstanceComponent },
      { path: 'instance/add', component: ApisixInstanceEditComponent, data: { type: 'add' } },
      { path: 'instance/edit/:id', component: ApisixInstanceEditComponent, data: { type: 'edit' } },
      { path: 'instance/copy/:id', component: ApisixInstanceEditComponent, data: { type: 'copy' } },
      { path: 'dashboard/:id', component: ApisixDashboardComponent },
      { path: 'route/:id', component: ApisixRouteComponent },
      { path: 'ssl/:id', component: ApisixSslComponent }
    ]
  }
];
