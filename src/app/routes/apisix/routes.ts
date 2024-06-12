import { Routes } from '@angular/router';

import {
  ApisixService,
  ApisixInstanceService,
  ApisixDashboardService,
  ApisixRouteService,
  ApisixSslService,
  ApisixInstanceComponent,
  ApisixDashboardComponent,
  ApisixRouteComponent,
  ApisixSslComponent,
  ApisixInstanceEditComponent,
  ApisixRouteEditComponent,
  ApisixSslEditComponent
} from '.';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'prefix',
    providers: [ApisixService, ApisixInstanceService, ApisixDashboardService, ApisixRouteService, ApisixSslService],
    children: [
      { path: '', redirectTo: 'instance', pathMatch: 'full' },
      { path: 'instance', component: ApisixInstanceComponent },
      { path: 'instance/add', component: ApisixInstanceEditComponent, data: { type: 'add', reuse: false } },
      { path: 'instance/edit/:id', component: ApisixInstanceEditComponent, data: { type: 'edit', reuse: false } },
      { path: 'instance/copy/:id', component: ApisixInstanceEditComponent, data: { type: 'copy', reuse: false } },
      { path: 'dashboard/:iid', component: ApisixDashboardComponent },
      { path: 'route/:iid', component: ApisixRouteComponent },
      { path: 'route/:iid/add', component: ApisixRouteEditComponent, data: { type: 'add', reuse: false } },
      { path: 'route/:iid/edit/:id', component: ApisixRouteEditComponent, data: { type: 'edit', reuse: false } },
      { path: 'route/:iid/copy/:id', component: ApisixRouteEditComponent, data: { type: 'copy', reuse: false } },
      { path: 'ssl/:iid', component: ApisixSslComponent },
      { path: 'ssl/:iid/add', component: ApisixSslEditComponent, data: { type: 'add', reuse: false } },
      { path: 'ssl/:iid/edit/:id', component: ApisixSslEditComponent, data: { type: 'edit', reuse: false } },
      { path: 'ssl/:iid/copy/:id', component: ApisixSslEditComponent, data: { type: 'copy', reuse: false } }
    ]
  }
];
