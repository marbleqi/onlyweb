import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { STColumn, STComponent, STData, STColumnTag } from '@delon/abc/st';
import { MenuService, SettingsService } from '@delon/theme';
import { SHARED_IMPORTS } from '@shared';
import { format, fromUnixTime } from 'date-fns';

import { ApisixRouteService } from '..';

@Component({
  selector: 'app-apisix-route',
  templateUrl: './route.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [...SHARED_IMPORTS]
})
export class ApisixRouteComponent implements OnInit {
  /**cdr */
  private readonly cdr = inject(ChangeDetectorRef);
  /**当前路由快照 */
  private readonly route = inject(ActivatedRoute);
  /**路由服务 */
  private readonly router = inject(Router);
  private readonly menuSrv = inject(MenuService);
  private readonly settingSrv = inject(SettingsService);
  /**APISIX的路由服务 */
  private readonly routeSrv = inject(ApisixRouteService);

  iid: number = 1;

  @ViewChild('st') private readonly st!: STComponent;
  columns: STColumn[] = [
    { title: 'ID', index: 'value.id' },
    {
      title: '名称',
      index: 'value.name',
      filter: { type: 'keyword', fn: (filter, record) => !filter.value || record.value.name.includes(filter.value) }
    },
    { title: '描述', index: 'value.desc' },
    {
      title: '域名',
      render: 'host',
      filter: {
        type: 'keyword',
        fn: (filter, record) => {
          if (!filter.value) {
            return true;
          }
          if (record?.host && record.host.includes(filter.value)) {
            return true;
          }
          if (record?.hosts && record.hosts.some((host: string) => host.includes(filter.value))) {
            return true;
          }
          return false;
        }
      }
    },
    { title: '路径', render: 'uri' },
    {
      title: '状态',
      index: 'value.status',
      width: 100,
      type: 'tag',
      tag: {
        1: { text: '已发布', color: 'green' },
        0: { text: '未发布', color: 'red' }
      } as STColumnTag,
      filter: {
        menus: [
          { value: 1, text: '已发布' },
          { value: 0, text: '未发布' }
        ],
        multiple: true,
        fn: (filter, record) => filter.value === null || filter.value === record.status
      }
    },
    {
      title: '创建时间',
      format: item => format(fromUnixTime(item.value.create_time), 'yyyy-MM-dd HH:mm:ss'),
      width: 200,
      sort: { compare: (a, b) => a.create_time - b.create_time }
    },
    {
      title: '更新时间',
      format: item => format(fromUnixTime(item.value.update_time), 'yyyy-MM-dd HH:mm:ss'),
      width: 200,
      sort: { compare: (a, b) => a.update_time - b.update_time }
    },
    {
      title: '操作',
      fixed: 'right',
      width: 300,
      buttons: [
        { text: '编辑', icon: 'edit', type: 'link', click: record => `/apisix/route/${this.iid}/edit/${record.value.id}` },
        { text: '克隆', icon: 'copy', type: 'link', click: record => `/apisix/route/${this.iid}/copy/${record.value.id}` },
        { text: '删除', icon: 'delete', click: record => this.remove(record.value.id) }
      ]
    }
  ];
  data: STData[] = [];
  constructor() {
    this.iid = Number(this.route.snapshot.params['iid']);
    if (!this.iid) {
      this.router.navigateByUrl('/apisix/instance');
    }
    this.settingSrv.setLayout('apisix', 'dddddd');
  }

  ngOnInit(): void {
    this.reload();
  }

  reload() {
    this.routeSrv.index(this.iid).subscribe(res => {
      console.debug(res.list);
      this.data = res.list;
      this.cdr.detectChanges();
    });
  }

  remove(id: string) {
    this.routeSrv.remove(this.iid, id).subscribe(res => {
      this.reload();
    });
  }
}
