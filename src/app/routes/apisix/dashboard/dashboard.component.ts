import { Component, OnInit, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { _HttpClient, Menu, MenuService, SettingsService, TitleService } from '@delon/theme';
import { SHARED_IMPORTS } from '@shared';

import { ApisixService, ApisixDashboardService } from '..';

@Component({
  selector: 'app-apisix-dashboard',
  standalone: true,
  imports: [...SHARED_IMPORTS],
  templateUrl: './dashboard.component.html'
})
export class ApisixDashboardComponent implements OnInit {
  /**当前路由快照 */
  private readonly route = inject(ActivatedRoute);
  /**路由服务 */
  private readonly router = inject(Router);
  private readonly settingSrv = inject(SettingsService);
  private readonly apisixSrv = inject(ApisixService);
  private readonly dashboardSrv = inject(ApisixDashboardService);
  iid: number = 1;

  ngOnInit(): void {
    const iid = Number(this.route.snapshot.params['iid']);
    this.apisixSrv.menu(iid);
  }
}
