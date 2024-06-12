import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SFSchema, SFUISchema } from '@delon/form';
import { _HttpClient } from '@delon/theme';
import { SHARED_IMPORTS } from '@shared';
import { NzMessageService } from 'ng-zorro-antd/message';

import { ApisixSslService } from '../..';

@Component({
  selector: 'app-apisix-ssl-edit',
  templateUrl: './edit.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [...SHARED_IMPORTS]
})
export class ApisixSslEditComponent implements OnInit {
  /**cdr */
  private readonly cdr = inject(ChangeDetectorRef);
  /**路由服务 */
  protected readonly router = inject(Router);
  /**当前路由快照 */
  protected readonly route = inject(ActivatedRoute);
  private readonly msgSrv = inject(NzMessageService);
  private readonly sslSrv = inject(ApisixSslService);
  /**加载状态 */
  loading: boolean = false;
  /**列表页路径 */
  baseUrl!: string;
  /**页面类型：创建、编辑、复制 */
  type!: 'add' | 'edit' | 'copy';
  iid!: number;
  title!: string;
  id!: string;
  /**对象名称 */
  name: string = '证书';
  /**提交按钮文字 */
  buttonName!: string;
  record: any = {};
  i: any;
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

  constructor() {
    console.debug('构造函数', this.route.snapshot.data['type']);
    this.iid = Number(this.route.snapshot.params['iid']);
    if (!this.iid) {
      this.router.navigateByUrl('/apisix/instance');
      return;
    }
    this.type = this.route.snapshot.data['type'];
    this.baseUrl = `/apisix/ssl/${this.iid}`;
    this.reload();
  }

  ngOnInit(): void {
    console.debug('初始化函数', this.route.snapshot.data['type']);
  }

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
          console.debug(`${this.name}数据`, res);
          this.i = res.value;
          this.value = res.value;
          this.loading = false;
          this.cdr.detectChanges();
        });
      }
    }
  }

  save() {
    const value = {
      ...this.value,
      id: undefined,
      create_time: undefined,
      update_time: undefined
    };
    console.debug('保存', this.value);
    if (this.type === 'edit') {
      this.sslSrv.update(this.iid, this.id, value).subscribe(res => {
        console.debug('保存结果', res);
        this.msgSrv.success('保存成功');
      });
    } else {
      this.sslSrv.create(this.iid, value).subscribe(res => {
        console.debug('创建结果', res);
        this.msgSrv.success('创建成功');
      });
    }
  }
}
