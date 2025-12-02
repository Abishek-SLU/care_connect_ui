import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatWidgetComponent } from './chat-widget.component';
import { MdSafePipe } from './markdown-safe.pipe';

@NgModule({
  declarations: [ChatWidgetComponent, MdSafePipe],
  imports: [CommonModule, FormsModule],
  exports: [ChatWidgetComponent]
})
export class ChatModule {}
