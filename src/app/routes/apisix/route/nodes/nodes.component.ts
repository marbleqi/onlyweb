import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild, EventEmitter, Input, Output, inject } from '@angular/core';
import { STComponent, STColumn } from '@delon/abc/st';
import { SHARED_IMPORTS } from '@shared';

/**节点编辑组件 */
@Component({
  selector: 'app-apisix-route-nodes',
  templateUrl: './nodes.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [...SHARED_IMPORTS]
})
export class ApisixRouteNodesComponent {
  /**cdr */
  private readonly cdr = inject(ChangeDetectorRef);
  /**表格组件 */
  @ViewChild('st') readonly st!: STComponent;
  /**表格列配置 */
  columns: STColumn[] = [
    { title: '主机名', render: 'host' },
    { title: '端口', render: 'port' },
    { title: '权重', render: 'weight' },
    { title: '操作', fixed: 'right', width: 300, render: 'operate' }
  ];
  /**只读标记 */
  disabled: boolean = false;
  @Input() set readonly(value: boolean) {
    this.disabled = value;
  }
  /**数据源 */
  @Input() data: any[] = [];
  /**弹出最新数据 */
  @Output() readonly dataChange = new EventEmitter<any[]>();

  /**构造函数 */
  constructor() {
    this.columns = this.columns.map((item: STColumn) => ({ ...item, className: 'text-center' }));
  }

  /**提交数据 */
  submit() {
    const value = this.st._data.map((item: any) => ({ host: item.host, port: item.port, weight: item.weight }));
    this.dataChange.emit(value);
  }

  /**
   * 修改行数据
   * @param type 类型，即列标记
   * @param index 行索引
   * @param value 行数据
   */
  setValue(type: 'host' | 'port' | 'weight', index: number, value: string) {
    this.st.setRow(index, { [type]: value });
    this.submit();
  }

  /**新建数据行 */
  add() {
    this.st.addRow({ host: 'localhost', port: 80, weight: 1 });
    this.submit();
  }

  /**
   * 复制当前数据行，并插入到当前行之前
   * @param item 当前数据行
   * @param index 当前的行索引
   */
  insert(item: any, index: number) {
    this.st.addRow(item, { index });
    this.submit();
  }

  /**
   * 复制当前数据行，并追加到表格末尾
   * @param item 当前数据行
   */
  copy(item: any) {
    this.st.addRow(item, { index: this.st.count });
    this.submit();
  }

  /**
   * 删除数据行
   * @param index 删除的行索引
   */
  distory(index: number) {
    this.st.removeRow(index);
    this.submit();
  }
}
