import { Injectable, inject } from '@angular/core';
import { SettingsService, MenuService } from '@delon/theme';

@Injectable()
export class SettingService {
  private readonly menuSrv = inject(MenuService);
  private readonly settingSrv = inject(SettingsService);

  menu() {
    this.menuSrv.clear();
    this.menuSrv.add([
      {
        text: 'Main',
        group: false,
        children: [
          {
            text: '应用配置',
            link: `/setting/app`,
            icon: { type: 'icon', value: 'tool' }
          },
          {
            text: '个人设置',
            link: `/setting/user`,
            icon: { type: 'icon', value: 'user' }
          },
          {
            text: '返回',
            link: `/home`,
            icon: { type: 'icon', value: 'home' }
          }
        ]
      }
    ]);
    this.settingSrv.setLayout('hideAside', false);
    this.settingSrv.setLayout('selectShowed', false);
    this.settingSrv.setLayout('mainTitle', '工具配置');
  }
}
