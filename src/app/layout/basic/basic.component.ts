import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
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
  /**cdr */
  private readonly cdr = inject(ChangeDetectorRef);
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
  /**选择框值 */
  mainTitle!: string;
  constructor() {
    this.settingSrv.notify.subscribe(res => {
      if (res.type === 'layout') {
        if (res.name === 'hideAside') {
          this.options = { ...this.options, hideAside: res.value };
        }
        if (res.name === 'selectShowed') {
          this.selectShowed = res.value;
          if (res.value) {
            this.selectOptions = this.settingSrv.getData('selectOptions');
            this.selectValue = this.settingSrv.getData('selectValue');
          }
        }
        if (res.name === 'mainTitle') {
          this.mainTitle = res.value;
        }
        this.cdr.detectChanges();
      }
    });
  }

  selectChange(value: any) {
    this.settingSrv.setLayout('selectValue', value);
  }
}
