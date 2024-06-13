import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { ControlWidget } from '@delon/form';
import { NuMonacoEditorComponent, NuMonacoEditorDiffComponent, NuMonacoEditorEvent } from '@ng-util/monaco-editor';
import { SHARED_IMPORTS } from '@shared';
import { sampleTime } from 'rxjs';

@Component({
  selector: 'sf-widget-monaco',
  templateUrl: './monaco.widget.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [...SHARED_IMPORTS]
})
export class MonacoWidget extends ControlWidget implements OnInit {
  /**小部件key */
  static readonly KEY = 'monaco';
  /**编辑器组件 */
  @ViewChild('monaco_editor') private readonly monaco_editor!: NuMonacoEditorComponent;
  /**编辑器组件 */
  @ViewChild('monaco_diff') private readonly monaco_diff!: NuMonacoEditorDiffComponent;
  /**编辑器模式 */
  mode: 'edit' | 'diff' = 'edit';
  /**是否锁定编辑器样式 */
  className!: string;
  /**是否锁定编辑器样式 */
  locked: boolean = false;
  /**编辑器高度 */
  height: string = '300px';
  /**只读 */
  readOnly: boolean = false;
  /**自动格式化 */
  autoFormat: boolean = true;
  /**语言 */
  language: string = 'yaml';
  /**样式 */
  theme: string = 'vs-dark';
  /**样式 */
  lineNumbers: monaco.editor.LineNumbersType = 'on';
  /**配置 */
  options: monaco.editor.IStandaloneEditorConstructionOptions = {
    language: 'yaml',
    theme: 'vs-dark',
    lineNumbers: 'on',
    wordWrap: 'on',
    suggestOnTriggerCharacters: false,
    acceptSuggestionOnEnter: 'off',
    acceptSuggestionOnCommitCharacter: false,
    snippetSuggestions: 'none'
  };
  /**初始化延迟时间 */
  delay: number = 0;

  ngOnInit(): void {
    if (this.ui['className']) {
      this.className = this.ui['className'];
    }
    if (this.ui['mode']) {
      this.mode = this.ui['mode'];
    }
    if (this.ui['locked']) {
      this.locked = true;
    }
    if (this.ui['height']) {
      this.height = this.ui['height'];
    }
    if (this.ui['readOnly']) {
      this.readOnly = this.ui['readOnly'];
    }
    if (!this.ui['autoFormat']) {
      this.autoFormat = false;
    }
    if (this.ui['options']['language']) {
      this.language = this.ui['options']['language'];
    }
    if (this.ui['options']['theme']) {
      this.theme = this.ui['options']['theme'];
    }
    if (this.ui['options']['lineNumbers']) {
      this.lineNumbers = this.ui['options']['lineNumbers'];
    }
    this.options = { ...this.options, language: this.language, theme: this.theme, lineNumbers: this.lineNumbers };
    if (this.ui['delay']) {
      this.delay = this.ui['delay'];
    }
    /**刷新间隔时间 */
    let freshTime: number = 0;
    if (this.ui['freshTime']) {
      freshTime = this.ui['freshTime'];
    }
    if (this.ui['fresh']) {
      this.ui['fresh']()
        .pipe(sampleTime(freshTime))
        .subscribe((value: string) => {
          this.setValue(value);
          this.reset(value);
          setTimeout(() => {
            const editor = this.monaco_editor?.editor;
            if (editor) {
              const model = editor.getModel();
              if (model) {
                editor.revealLine(model.getLineCount());
              }
            }
          }, 500);
        });
    }
  }

  languageChange(language: string) {
    this.options = { ...this.options, language };
  }

  themeChange(theme: string) {
    this.options = { ...this.options, theme };
  }

  lineNumbersChange(lineNumbers: monaco.editor.LineNumbersType) {
    this.options = { ...this.options, lineNumbers };
  }

  showEvent(e: NuMonacoEditorEvent) {
    console.debug('monaco编辑器事件', e);
  }
}
