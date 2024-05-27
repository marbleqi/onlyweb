import { Component, OnInit, inject } from '@angular/core';
import { STColumn, STData } from '@delon/abc/st';
import { SHARED_IMPORTS } from '@shared';

import { ApisixInstanceService } from '..';

@Component({
  selector: 'app-apisix-instance',
  standalone: true,
  imports: [...SHARED_IMPORTS],
  templateUrl: './instance.component.html'
})
export class ApisixInstanceComponent implements OnInit {
  private readonly instanceSrv = inject(ApisixInstanceService);

  /**表格配置 */
  columns: STColumn[] = [
    { type: 'checkbox' },
    { title: '实例ID', index: 'id' },
    { title: '实例名称', index: 'name' },
    { title: '实例说明', index: 'description' },
    { title: '接口地址', index: 'url' },
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
    this.reload();
  }

  reload() {
    this.data = this.instanceSrv.index();
  }

  add(): void {
    // this.modal
    //   .createStatic(FormEditComponent, { i: { id: 0 } })
    //   .subscribe(() => this.st.reload());
  }
}
