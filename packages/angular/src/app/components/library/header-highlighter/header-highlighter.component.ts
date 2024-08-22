import { Component, NgModule, Input, Output, EventEmitter } from '@angular/core';
import { DxButtonModule, DxDataGridModule, DxTabsModule, DxToolbarModule } from 'devextreme-angular';

@Component({
  selector: 'app-header-highlighter',
  templateUrl: './header-highlighter.component.html',
  styleUrls: ['./header-highlighter.component.scss']
})
export class HeaderHighlighterComponent {
  @Input()highlightedContent: string;

  @Output() close = new EventEmitter<void>();

  onCloseClick(){
    this.close.emit();
  }
}

@NgModule({
  imports: [
    DxButtonModule,
    DxDataGridModule,
    DxTabsModule,
    DxToolbarModule,
 
  ],
  declarations: [HeaderHighlighterComponent],
  exports: [HeaderHighlighterComponent]
})

export class HeaderHighlighterModule { }

