import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SFSchema, SFUISchema } from '@delon/form';
import { SettingsService } from '@delon/theme';
import { SHARED_IMPORTS } from '@shared';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subscription } from 'rxjs';

import { ApisixService, ApisixSslService } from '../..';

@Component({
  selector: 'app-apisix-ssl-edit',
  templateUrl: './edit.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [...SHARED_IMPORTS]
})
export class ApisixSslEditComponent implements OnInit, OnDestroy {
  /**cdr */
  private readonly cdr = inject(ChangeDetectorRef);
  /**路由服务 */
  protected readonly router = inject(Router);
  /**当前路由快照 */
  protected readonly route = inject(ActivatedRoute);
  /**消息服务 */
  private readonly msgSrv = inject(NzMessageService);
  /**框架配置服务 */
  private readonly settingSrv = inject(SettingsService);
  /**当前模块服务 */
  private readonly apisixSrv = inject(ApisixService);
  private readonly sslSrv = inject(ApisixSslService);
  /**加载状态 */
  loading: boolean = false;
  /**列表页路径 */
  baseUrl!: string;
  /**页面类型：创建、编辑、复制 */
  type!: 'add' | 'edit' | 'copy';
  /**APISIX实例ID */
  iid!: number;
  /**标题 */
  title!: string;
  /**路由ID */
  id!: string;
  /**对象名称 */
  name: string = '证书';
  /**提交按钮文字 */
  buttonName!: string;
  /**表单初始数据 */
  i: any;
  /**表单配置 */
  schema: SFSchema = {
    properties: {
      id: { type: 'string', title: 'id' },
      snis: { type: 'string', title: '域名', min: 1, max: 50 },
      status: {
        type: 'number',
        title: '状态',
        default: 1,
        enum: [
          { value: 1, label: '发布' },
          { value: 0, label: '下线' }
        ]
      },
      key: { type: 'string', title: '私钥' },
      cert: { type: 'string', title: '证书' },
      create_time: { type: 'number', title: '创建时间', timestamp: 's' },
      update_time: { type: 'number', title: '修改时间', timestamp: 's' }
    }
  };
  /**表单样式 */
  ui: SFUISchema = {
    '*': { spanLabelFixed: 100, spanLabel: 4, spanControl: 20, grid: { span: 12 } },
    $id: { widget: 'text', grid: { span: 24 } },
    $snis: { widget: 'list' },
    $status: { widget: 'radio', styleType: 'button', buttonStyle: 'solid' },
    $key: { widget: 'textarea', autosize: { minRows: 5, maxRows: 10 }, grid: { span: 24 } },
    $cert: { widget: 'textarea', autosize: { minRows: 5, maxRows: 10 }, grid: { span: 24 } },
    $create_time: { widget: 'at' },
    $update_time: { widget: 'at' }
  };
  /**表单提交数据 */
  value: any;
  /**通知订阅 */
  notify: Subscription;
  constructor() {
    this.notify = this.settingSrv.notify.subscribe(res => {
      if (res.type === 'layout' && res.name === 'selectValue' && this.iid !== res.value) {
        this.router.navigateByUrl(`/apisix/ssl/${res.value}`);
      }
    });
  }

  /**组件初始化 */
  ngOnInit(): void {
    this.iid = Number(this.route.snapshot.params['iid']);
    if (!this.iid) {
      this.router.navigateByUrl('/apisix/instance');
      return;
    }
    this.type = this.route.snapshot.data['type'];
    this.baseUrl = `/apisix/ssl/${this.iid}`;
    this.apisixSrv.menu(this.iid);
    this.reload();
  }

  /**页面刷新 */
  reload() {
    if (this.type === 'add') {
      this.title = `新建${this.name}`;
      this.buttonName = '提交';
      this.loading = false;
      this.i = {};
      this.value = {};
    } else {
      if (!this.route.snapshot.params['id']) {
        this.msgSrv.error(`${this.name}id不存在`);
        this.router.navigateByUrl(this.baseUrl);
      } else {
        this.id = this.route.snapshot.params['id'];
        if (this.type === 'edit') {
          this.title = `修改${this.name}`;
          this.buttonName = '保存';
        } else {
          this.title = `克隆${this.name}`;
          this.buttonName = '提交';
        }
        this.sslSrv.show(this.iid, this.id).subscribe(res => {
          this.i = res.value;
          this.value = res.value;
          this.loading = false;
          this.cdr.detectChanges();
        });
      }
    }
  }

  /**保存提交 */
  save() {
    const value = {
      ...this.value,
      id: undefined,
      create_time: undefined,
      update_time: undefined
    };
    if (this.type === 'edit') {
      this.sslSrv.update(this.iid, this.id, value).subscribe(res => {
        this.msgSrv.success('保存成功');
      });
    } else {
      this.sslSrv.create(this.iid, value).subscribe(res => {
        this.msgSrv.success('创建成功');
      });
    }
  }

  /**组件销毁 */
  ngOnDestroy(): void {
    this.notify.unsubscribe();
  }
}
