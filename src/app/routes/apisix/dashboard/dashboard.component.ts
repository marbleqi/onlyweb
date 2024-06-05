import { Component, OnInit, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { _HttpClient, Menu, MenuService, SettingsService, TitleService } from '@delon/theme';
import { SHARED_IMPORTS } from '@shared';

import { ApisixDashboardService } from '..';

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
  private readonly menuSrv = inject(MenuService);
  private readonly dashboardSrv = inject(ApisixDashboardService);
  iid: number = 1;

  constructor() {
    this.iid = Number(this.route.snapshot.params['iid']);
    if (!this.iid) {
      this.router.navigateByUrl('/apisix/instance');
    }

    const menus: Menu[] = [
      {
        text: 'Main',
        group: false,
        children: [
          {
            text: '概览',
            link: `/apisix/dashboard/${this.iid}`,
            icon: { type: 'icon', value: 'appstore' }
          },
          {
            text: '路由',
            link: `/apisix/route/${this.iid}`,
            icon: { type: 'icon', value: 'appstore' }
          },
          {
            text: '返回',
            link: `/dashboard`,
            icon: { type: 'icon', value: 'appstore' }
          }
        ]
      }
    ];
    this.menuSrv.clear();
    this.menuSrv.add(menus);
  }

  ngOnInit(): void {
    console.debug('');
  }
}
