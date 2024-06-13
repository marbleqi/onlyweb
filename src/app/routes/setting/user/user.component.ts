import { ChangeDetectionStrategy, Component, OnInit, ViewChild, inject } from '@angular/core';
import { SFComponent, SFSchema, SFUISchema } from '@delon/form';
import { SettingsService } from '@delon/theme';
import { SHARED_IMPORTS } from '@shared';
import { NzMessageService } from 'ng-zorro-antd/message';

import { SettingService } from '..';

@Component({
  selector: 'app-setting-user',
  templateUrl: './user.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [...SHARED_IMPORTS]
})
export class SettingUserComponent implements OnInit {
  /**消息服务 */
  private readonly msgSrv = inject(NzMessageService);
  /**框架配置服务 */
  private readonly settingSrv = inject(SettingsService);
  /**当前模块配置服务 */
  private readonly setting = inject(SettingService);
  /**表单 */
  @ViewChild('sf') readonly sf!: SFComponent;
  /**表单配置 */
  schema: SFSchema = {
    properties: {
      name: { type: 'string', title: '姓名' },
      email: { type: 'string', title: '电子邮箱' },
      avatar: { type: 'string', title: '头像' },
      create_at: { type: 'number', title: '创建时间' },
      update_at: { type: 'number', title: '修改时间' }
    },
    required: ['name', 'description']
  };
  /**表单样式 */
  ui: SFUISchema = {
    '*': { spanLabelFixed: 100, spanLabel: 4, spanControl: 20, grid: { span: 24 } },
    $create_at: { widget: 'at' },
    $update_at: { widget: 'at' }
  };
  /**表单初始数据 */
  i: any;

  ngOnInit(): void {
    this.setting.menu();
    this.reload();
  }

  reload() {
    this.i = this.settingSrv.getUser();
  }

  save(): void {
    this.settingSrv.setUser({ ...this.sf.value, create_at: this.sf.value?.['create_at'] || Date.now(), update_at: Date.now() });
    this.msgSrv.success('保存成功');
    this.reload();
  }
}
