import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuService, SettingsService } from '@delon/theme';
import { LayoutDefaultModule, LayoutDefaultOptions } from '@delon/theme/layout-default';
import { SHARED_IMPORTS } from '@shared';

import { HeaderClearStorageComponent, HeaderFullScreenComponent, HeaderUserComponent } from '..';

@Component({
  selector: 'layout-basic',
  templateUrl: './basic.component.html',
  standalone: true,
  imports: [
    RouterOutlet,
    LayoutDefaultModule,
    ...SHARED_IMPORTS,
    HeaderClearStorageComponent,
    HeaderFullScreenComponent,
    HeaderUserComponent
  ]
})
export class LayoutBasicComponent {
  private menuSrv = inject(MenuService);
  private settingSrv = inject(SettingsService);

  options: LayoutDefaultOptions = { logoExpanded: `./assets/logo.png`, logoCollapsed: `./assets/logo.png` };

  showSelected: boolean = false;
  selectOptions: any[] = [];

  selectValue: any = null;

  constructor() {
    this.settingSrv.notify.subscribe(res => {
      console.debug('通知', res);
    });
  }

  selectChange(value: any) {
    console.debug('selectChange', value);
  }
}
