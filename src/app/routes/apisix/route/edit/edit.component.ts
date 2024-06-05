import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SFSchema, SFUISchema } from '@delon/form';
import { _HttpClient } from '@delon/theme';
import { SHARED_IMPORTS } from '@shared';
import { NzMessageService } from 'ng-zorro-antd/message';

import { ApisixRouteService, ApisixRouteNodesComponent } from '../..';

@Component({
  selector: 'app-apisix-route-edit',
  templateUrl: './edit.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [...SHARED_IMPORTS, ApisixRouteNodesComponent]
})
export class ApisixRouteEditComponent implements OnInit {
  /**cdr */
  private readonly cdr = inject(ChangeDetectorRef);
  /**路由服务 */
  protected readonly router = inject(Router);
  /**当前路由快照 */
  protected readonly route = inject(ActivatedRoute);
  private readonly msgSrv = inject(NzMessageService);
  private readonly routeSrv = inject(ApisixRouteService);
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
  name: string = '路由';
  /**提交按钮文字 */
  buttonName!: string;
  record: any = {};
  i: any;
  schema: SFSchema = {
    properties: {
      id: { type: 'string', title: 'id' },
      name: { type: 'string', title: '名称' },
      desc: { type: 'string', title: '描述' },
      enable_websocket: { type: 'boolean', title: 'WebSocket' },
      status: {
        type: 'number',
        title: '状态',
        default: 1,
        enum: [
          { value: 1, label: '发布' },
          { value: 0, label: '下线' }
        ]
      },
      hosts: { type: 'string', title: '域名', min: 1, max: 50 },
      uris: { type: 'string', title: '路径', min: 1, max: 50 },
      methods: {
        type: 'string',
        title: '方法',
        enum: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS', 'CONNECT', 'TRACE', 'PURGE']
      },
      remote_addrs: { type: 'string', title: '客户端地址', min: 0, max: 100 },
      priority: { type: 'number', title: '优先级', default: 0 },
      upstream: {
        type: 'object',
        properties: {
          scheme: {
            type: 'string',
            title: '协议',
            default: 'http',
            enum: [
              { label: 'HTTP', value: 'http' },
              { label: 'HTTPS', value: 'https' }
            ]
          },
          pass_host: {
            type: 'string',
            title: '请求头host',
            default: 'pass',
            enum: [
              { label: '透传', value: 'pass' },
              { label: '使用目标节点', value: 'node' }
            ]
          },
          retries: { type: 'number', title: '重试次数' },
          retry_timeout: { type: 'number', title: '重试超时时间' },
          timeout: {
            type: 'object',
            properties: {
              connect: { type: 'number', title: '连接超时', default: 6 },
              send: { type: 'number', title: '发送超时', default: 6 },
              read: { type: 'number', title: '接收超时', default: 6 }
            }
          },
          keepalive_pool: {
            type: 'object',
            title: '连接池',
            properties: {
              idle_timeout: { type: 'number', title: '空闲超时时间', default: 60 },
              requests: { type: 'number', title: '请求数量', default: 1000 },
              size: { type: 'number', title: '容量', default: 320 }
            }
          },
          type: {
            type: 'string',
            title: '类型',
            default: 'roundrobin',
            enum: [
              { label: '带权轮询（Round Robin）', value: 'roundrobin' },
              { label: '一致性哈希（CHash）', value: 'chash' },
              { label: '指数加权移动平均法（EWMA）', value: 'ewma' },
              { label: '最小连接数（least_conn）', value: 'least_conn' }
            ]
          },
          nodes: { type: 'string', title: '目标节点' }
        }
      },
      create_time: { type: 'number', title: '创建时间', timestamp: 's' },
      update_time: { type: 'number', title: '修改时间', timestamp: 's' }
    }
  };
  ui: SFUISchema = {
    '*': { spanLabelFixed: 100, spanLabel: 4, spanControl: 20, grid: { span: 12 } },
    $id: { widget: 'text', grid: { span: 24 } },
    $status: { widget: 'radio', styleType: 'button', buttonStyle: 'solid', grid: { span: 8 } },
    $hosts: { widget: 'list', grid: { span: 12 } },
    $uris: { widget: 'list', grid: { span: 12 } },
    $methods: { widget: 'select', grid: { span: 12 }, mode: 'multiple' },
    $remote_addrs: { widget: 'list', grid: { span: 12 } },
    $upstream: {
      grid: { span: 24 },
      $scheme: { widget: 'select', grid: { span: 6 } },
      $pass_host: { widget: 'select', grid: { span: 6 } },
      $retries: { grid: { span: 6 } },
      $retry_timeout: { grid: { span: 6 } },
      $timeout: { grid: { span: 12 }, $connect: { grid: { span: 8 } }, $send: { grid: { span: 8 } }, $read: { grid: { span: 8 } } },
      $keepalive_pool: {
        grid: { span: 12 },
        $idle_timeout: { grid: { span: 8 } },
        $requests: { grid: { span: 8 } },
        $size: { grid: { span: 8 } }
      },
      $type: { widget: 'select', grid: { span: 8 } },
      $nodes: { widget: 'custom', grid: { span: 24 } }
    },
    $create_time: { widget: 'at' },
    $update_time: { widget: 'at' }
  };
  /**表单提交数据 */
  value: any;
  /**节点数据 */
  nodes: any[] = [];
  constructor() {
    console.debug('构造函数', this.route.snapshot.data['type']);
    this.iid = Number(this.route.snapshot.params['iid']);
    if (!this.iid) {
      this.router.navigateByUrl('/apisix/instance');
      return;
    }
    this.type = this.route.snapshot.data['type'];
    this.baseUrl = `/apisix/route/${this.iid}`;
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
      this.nodes = [];
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
        this.routeSrv.show(this.iid, this.id).subscribe(res => {
          console.debug(`${this.name}数据`, res);
          this.i = res.value;
          this.value = res.value;
          this.nodes = res.value.upstream.nodes;
          this.loading = false;
          this.cdr.detectChanges();
        });
      }
    }
  }

  nodesChange(value: any) {
    console.debug('节点变化', value);
    this.nodes = value;
    this.value = { upstream_id: this.value.upstream_id, upstream: { ...this.value.upstream, nodes: this.nodes } };
    // this.change.emit(this.value);
  }

  save() {
    const value = {
      ...this.value,
      upstream: { ...this.value.upstream, nodes: this.nodes },
      id: undefined,
      create_time: undefined,
      update_time: undefined
    };
    console.debug('保存', this.value);
    if (this.type === 'edit') {
      this.routeSrv.update(this.iid, this.id, value).subscribe(res => {
        console.debug('保存结果', res);
        this.msgSrv.success('保存成功');
      });
    } else {
      this.routeSrv.create(this.iid, value).subscribe(res => {
        console.debug('创建结果', res);
        this.msgSrv.success('创建成功');
      });
    }
  }
}
