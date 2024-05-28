import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { STColumn, STComponent, STData, STColumnTag } from '@delon/abc/st';
import { SFSchema } from '@delon/form';
import { SHARED_IMPORTS } from '@shared';
import { format, fromUnixTime } from 'date-fns';

import { ApisixRouteService } from '..';

@Component({
  selector: 'app-apisix-route',
  standalone: true,
  imports: [...SHARED_IMPORTS],
  templateUrl: './route.component.html'
})
export class ApisixRouteComponent implements OnInit {
  private readonly routeSrv = inject(ApisixRouteService);

  id: number = 1;
  searchSchema: SFSchema = {
    properties: {
      no: {
        type: 'string',
        title: '编号'
      }
    }
  };
  @ViewChild('st') private readonly st!: STComponent;
  columns: STColumn[] = [
    { title: 'ID', index: 'value.id' },
    {
      title: '名称',
      index: 'name',
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
        { text: '编辑', icon: 'edit', type: 'link', click: record => `/apisix/route/${this.id}/edit/${record.id}` },
        { text: '克隆', icon: 'copy', type: 'link', click: record => `/apisix/route/${this.id}/copy/${record.id}` }
      ]
    }
  ];
  data: STData[] = [];
  ngOnInit(): void {
    this.reload();
  }
  reload() {
    this.routeSrv.index(1).subscribe(res => {
      console.debug(res.list);
      this.data = res.list;
    });
  }

  add(): void {
    // this.modal
    //   .createStatic(FormEditComponent, { i: { id: 0 } })
    //   .subscribe(() => this.st.reload());
  }
}
