import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SettingsService } from '@delon/theme';
import { LayoutDefaultModule, LayoutDefaultOptions } from '@delon/theme/layout-default';
import { SHARED_IMPORTS } from '@shared';

import { HeaderClearStorageComponent, HeaderFullScreenComponent, HeaderUserComponent } from '..';

/**默认布局 */
@Component({
  selector: 'layout-basic',
  templateUrl: './basic.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  /**配置项目服务 */
  private readonly settingSrv = inject(SettingsService);
  /**布局配置 */
  options: LayoutDefaultOptions = { logoExpanded: `./assets/logo.png`, logoCollapsed: `./assets/logo.png` };
  /**是否显示选择框 */
  selectShowed: boolean = false;
  /**选择框选项 */
  selectOptions: any[] = [];
  /**选择框值 */
  selectValue!: any;

  constructor() {
    this.settingSrv.notify.subscribe(res => {
      console.debug('通知', res);
      if (res.type === 'layout') {
        if (res.name === 'hideAside') {
          this.options = { ...this.options, hideAside: res.value };
        }
        if (res.name === 'selectShowed') {
          this.selectShowed = res.value;
          if (res.value) {
            this.selectOptions = [];
          }
        }
      }
    });
  }

  selectChange(value: any) {
    console.debug('selectChange', value);
  }
}
