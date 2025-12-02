import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { ApiStatusComponent } from './shared/api-status.component'; 
import { ToastContainerComponent } from './shared/toast-container.component';
import { ChatWidgetComponent } from './chat/chat-widget.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, ApiStatusComponent, ToastContainerComponent, ChatWidgetComponent],
  templateUrl: './app.html'
})
export class App {}