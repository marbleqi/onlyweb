import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { STColumn, STData } from '@delon/abc/st';
import { SHARED_IMPORTS } from '@shared';

import { ApisixInstanceService, ApisixService } from '..';

@Component({
  selector: 'app-apisix-instance',
  templateUrl: './instance.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [...SHARED_IMPORTS]
})
export class ApisixInstanceComponent implements OnInit {
  /**实例服务 */
  private readonly instanceSrv = inject(ApisixInstanceService);
  /**当前模块服务 */
  private readonly apisixSrv = inject(ApisixService);

  /**表格配置 */
  columns: STColumn[] = [
    { type: 'checkbox' },
    { title: '实例ID', index: 'id' },
    { title: '实例名称', type: 'link', index: 'name', click: record => `/apisix/route/${record.id}` },
    { title: '实例说明', index: 'description' },
    { title: '接口地址', index: 'url' },
    { title: '创建时间', index: 'create_at', type: 'date', dateFormat: 'yyyy-MM-dd HH:mm:ss.SSS' },
    { title: '修改时间', index: 'update_at', type: 'date', dateFormat: 'yyyy-MM-dd HH:mm:ss.SSS' },
    {
      title: '操作',
      fixed: 'right',
      width: 300,
      buttons: [
        { text: '编辑', icon: 'edit', type: 'link', click: record => `/apisix/instance/edit/${record.id}` },
        { text: '克隆', icon: 'copy', type: 'link', click: record => `/apisix/instance/copy/${record.id}` }
      ]
    }
  ];
  data: STData[] = [];

  ngOnInit(): void {
    this.apisixSrv.main();
    this.reload();
  }

  reload() {
    this.data = this.instanceSrv.index();
  }
}
