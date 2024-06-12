import { Injectable, inject } from '@angular/core';
import { SettingsService, MenuService } from '@delon/theme';

@Injectable()
export class ApisixService {
  private readonly menuSrv = inject(MenuService);
  private readonly settingSrv = inject(SettingsService);

  menu(id: number) {
    this.menuSrv.clear();
    this.menuSrv.add([
      {
        text: 'Main',
        group: false,
        children: [
          {
            text: '概览',
            link: `/apisix/dashboard/${id}`,
            icon: { type: 'icon', value: 'tool' }
          },
          {
            text: '路由',
            link: `/apisix/route/${id}`,
            icon: { type: 'icon', value: 'user' }
          },
          {
            text: '路由',
            link: `/apisix/route/${id}`,
            icon: { type: 'icon', value: 'user' }
          },
          {
            text: '返回首页',
            link: `/apisix`,
            icon: { type: 'icon', value: 'home' }
          },
          {
            text: '返回首页',
            link: `/home`,
            icon: { type: 'icon', value: 'home' }
          }
        ]
      }
    ]);
    this.settingSrv.setLayout('hideAside', false);
    this.settingSrv.setLayout('selectShowed', false);
    this.settingSrv.setLayout('mainTitle', []);
  }
}
