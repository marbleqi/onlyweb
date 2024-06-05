import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SFComponent, SFSchema, SFUISchema } from '@delon/form';
import { _HttpClient } from '@delon/theme';
import { SHARED_IMPORTS } from '@shared';
import { NzMessageService } from 'ng-zorro-antd/message';

import { ApisixInstanceService } from '../..';

@Component({
  selector: 'app-apisix-instance-edit',
  templateUrl: './edit.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [...SHARED_IMPORTS]
})
export class ApisixInstanceEditComponent {
  /**cdr */
  private readonly cdr = inject(ChangeDetectorRef);
  /**路由服务 */
  protected readonly router = inject(Router);
  /**当前路由快照 */
  protected readonly route = inject(ActivatedRoute);
  /**消息服务 */
  private readonly msgSrv = inject(NzMessageService);
  /**实例服务 */
  private readonly instanceSrv = inject(ApisixInstanceService);
  /**页面类型：创建、编辑、复制 */
  type!: 'add' | 'edit' | 'copy';
  /**页面类型：创建、编辑、复制 */
  loading: boolean = true;
  /**列表页路径 */
  baseUrl: string = '/apisix/instance';
  /**对象名称 */
  name: string = '实例';
  /**主标题 */
  title!: string;
  /**提交按钮文字 */
  buttonName!: string;
  /**表单 */
  @ViewChild('sf') readonly sf!: SFComponent;
  /**表单配置 */
  schema: SFSchema = {
    properties: {
      name: { type: 'string', title: '实例名称' },
      description: { type: 'string', title: '实例说明' },
      url: { type: 'string', title: '接口地址' },
      key: { type: 'string', title: '接口密钥' },
      create_at: { type: 'number', title: '创建时间' },
      update_at: { type: 'number', title: '修改时间' }
    },
    required: ['name', 'description', 'url', 'key']
  };
  /**表单样式 */
  ui: SFUISchema = {
    '*': { spanLabelFixed: 100, spanLabel: 4, spanControl: 20, grid: { span: 12 } },
    $id: { widget: 'text', hidden: true, grid: { span: 24 } },
    $create_at: { widget: 'at' },
    $update_at: { widget: 'at' }
  };
  id!: number;
  i: any;
  /**表单提交数据 */
  value: any;

  constructor() {
    this.type = this.route.snapshot.data['type'];
    if (this.type === 'add') {
      this.title = `新建${this.name}`;
      this.buttonName = '提交';
      this.i = {};
      this.value = {};
    } else {
      if (!this.route.snapshot.params['id']) {
        this.msgSrv.error(`${this.name}id不存在`);
        this.router.navigateByUrl(this.baseUrl);
      } else {
        this.id = Number(this.route.snapshot.params['id']);
        if (this.type === 'edit') {
          this.title = `修改${this.name}`;
          this.buttonName = '保存';
        } else {
          this.title = `克隆${this.name}`;
          this.buttonName = '提交';
        }
        this.i = this.instanceSrv.show(this.id);
        this.value = this.instanceSrv.show(this.id);
      }
    }
    this.loading = false;
  }

  reload() {
    this.sf.reset();
  }

  save(): void {
    if (this.type === 'edit') {
      this.instanceSrv.update(this.id, this.value);
      this.msgSrv.success('保存成功');
    } else {
      this.instanceSrv.create(this.value);
      this.msgSrv.success('创建成功');
    }
  }
}
