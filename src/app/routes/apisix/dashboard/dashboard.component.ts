import { Component, OnInit, inject } from '@angular/core';
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
  private readonly menuService = inject(MenuService);
  private readonly dashboardSrv = inject(ApisixDashboardService);

  ngOnInit(): void {
    console.debug('');

    const menus: Menu[] = [
      {
        text: 'Main',
        group: false,
        children: [
          {
            text: '概览',
            link: '/apisix/dashboard/1',
            icon: { type: 'icon', value: 'appstore' }
          },
          {
            text: '路由',
            link: '/apisix/route/1',
            icon: { type: 'icon', value: 'appstore' }
          },
          {
            text: '返回',
            link: '/dashboard',
            icon: { type: 'icon', value: 'appstore' }
          }
        ]
      }
    ];
    this.menuService.clear();
    this.menuService.add(menus);
  }
}
