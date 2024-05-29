import { FooterToolbarModule } from '@delon/abc/footer-toolbar';
import { PageHeaderModule } from '@delon/abc/page-header';
import { ResultModule } from '@delon/abc/result';
import { ReuseTabModule } from '@delon/abc/reuse-tab';
import { SEModule } from '@delon/abc/se';
import { STModule } from '@delon/abc/st';
import { SVModule } from '@delon/abc/sv';
import { DelonFormModule } from '@delon/form';
import { TreeSelectWidgetModule } from '@delon/form/widgets/tree-select';
export const SHARED_DELON_MODULES = [
  PageHeaderModule,
  STModule,
  SEModule,
  SVModule,
  ResultModule,
  DelonFormModule,
  TreeSelectWidgetModule,
  FooterToolbarModule,
  ReuseTabModule
];
