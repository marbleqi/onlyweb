import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService, MenuService } from '@delon/theme';

import { ApisixInstanceService } from '.';

@Injectable()
export class ApisixService {
  /**路由服务 */
  private readonly router = inject(Router);
  private readonly menuSrv = inject(MenuService);
  private readonly settingSrv = inject(SettingsService);
  /**实例服务 */
  private readonly instanceSrv = inject(ApisixInstanceService);

  main() {
    const instanceUrl = '/apisix/instance';
    this.menuSrv.clear();
    this.menuSrv.add([
      {
        text: 'Main',
        group: false,
        children: [
          {
            text: '实例列表',
            link: instanceUrl,
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
    this.settingSrv.setLayout('mainTitle', 'APISIX');
  }

  menu(id: number) {
    const instanceUrl = '/apisix/instance';
    if (!id) {
      this.router.navigateByUrl(instanceUrl);
      return;
    }
    this.menuSrv.clear();
    this.menuSrv.add([
      {
        text: 'Main',
        group: false,
        children: [
          // {
          //   text: '概览',
          //   link: `/apisix/dashboard/${id}`,
          //   icon: { type: 'icon', value: 'tool' }
          // },
          {
            text: '路由',
            link: `/apisix/route/${id}`,
            icon: { type: 'icon', value: 'user' }
          },
          // {
          //   text: '上游',
          //   link: `/apisix/upstream/${id}`,
          //   icon: { type: 'icon', value: 'user' }
          // },
          {
            text: '证书',
            link: `/apisix/ssl/${id}`,
            icon: { type: 'icon', value: 'user' }
          },
          {
            text: '返回实例列表',
            link: instanceUrl,
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
    this.settingSrv.setLayout('selectShowed', true);
    this.settingSrv.setData(
      'selectOptions',
      this.instanceSrv.index().map(item => ({
        label: item.name,
        value: item.id
      }))
    );
    this.settingSrv.setData('selectValue', id);
  }
}
