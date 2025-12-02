// src/app/chat/chat-widget.component.ts
import { Component } from '@angular/core';
import { ChatService } from './chat.service';

type Role = 'user' | 'bot';
interface ChatMessage { role: Role; text: string; ts: number; }
interface QuickReply { label: string; payload: string; }

@Component({
  selector: 'app-chat-widget',
  template: `
  <div class="wrap" [class.collapsed]="collapsed" role="region" aria-label="CareConnect Assistant">
    <div class="head"
         [attr.aria-expanded]="!collapsed"
         (click)="collapsed && toggle()"
         [attr.title]="collapsed ? 'Expand' : 'Collapse'">
      <span class="title">CareConnect Assistant</span>

      <button type="button"
              class="collapse-btn"
              [attr.aria-label]="collapsed ? 'Expand chat' : 'Collapse chat'"
              (click)="toggle(); $event.stopPropagation()">
        <svg viewBox="0 0 24 24" width="18" height="18" focusable="false"
             [style.transform]="collapsed ? 'rotate(180deg)' : 'rotate(0deg)'">
          <path d="M7 10l5 5 5-5" fill="none" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>

    <div class="body">
      <div *ngFor="let m of history"
           class="msg"
           [class.user]="m.role==='user'"
           [class.bot]="m.role==='bot'"
           [innerHTML]="m.text | mdsafe">
      </div>
      <div *ngIf="typing" class="typing">Assistant is typing…</div>
    </div>

    <div class="foot">
      <div class="chips" *ngIf="quickReplies.length">
        <!-- why: starter=true ensures intro policy -->
        <span class="chip" *ngFor="let q of quickReplies" (click)="send(q.payload, true)">{{ q.label }}</span>
      </div>
      <div class="row">
        <input type="text"
               [(ngModel)]="draft"
               (keyup.enter)="send()"
               placeholder="Ask a general health question (e.g., 'I have a headache')">
        <button (click)="send()" [disabled]="!draft.trim()">Send</button>
      </div>
    </div>
  </div>
  `,
  styles: [`
  :host { position: fixed; right: 16px; bottom: 16px; z-index: 1000; }
  .wrap {
    width: 320px; max-height: 60vh; background: #fff; border: 1px solid rgba(0,0,0,.08);
    border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,.2);
    display: grid; grid-template-rows: auto 1fr auto; overflow: hidden;
  }
  .head {
    position: relative; display: flex; align-items: center; justify-content: space-between; gap: .5rem;
    padding: .6rem .8rem; background: #4f86c6; color: #fff; border-radius: 12px 12px 0 0;
    font-weight: 700; user-select: none; cursor: default;
  }
  .head .title { pointer-events: none; }
  .collapse-btn {
    display: grid; place-items: center; width: 28px; height: 28px;
    border: none; background: transparent; color: #fff; border-radius: 6px; cursor: pointer;
  }
  .collapse-btn:hover { background: rgba(255,255,255,.15); }
  .body { overflow: auto; padding: .6rem; display: grid; gap: .4rem; background: #f8fafc; }
  .msg { max-width: 80%; padding: .5rem .6rem; border-radius: 10px; font-size: 13px; line-height: 1.25; }
  .user { justify-self: end; background: #dbeafe; border: 1px solid #bfdbfe; }
  .bot  { justify-self: start; background: #fff; border: 1px solid #e2e8f0; }
  .foot { display: grid; gap: .4rem; padding: .5rem; background: #fff; border-top: 1px solid #e5e7eb; }
  .row  { display: flex; gap: .4rem; }
  input[type="text"]{ flex:1; height:34px; border-radius: 8px; border:1px solid #cbd5e1; padding: 0 .6rem; }
  button{ height:34px; border:0; border-radius:8px; background:#4f86c6; color:#fff; font-weight:700; padding:0 .8rem; }
  .chip{ display:inline-grid; place-items:center; height:26px; padding: 0 .6rem; font-size:12px; background:#eef2ff; color:#334155;
         border:1px solid #c7d2fe; border-radius:999px; cursor:pointer; }
  .chips{ display:flex; gap:.4rem; flex-wrap:wrap; }
  .typing{ font-size:12px; color:#64748b; }

  /* Collapsed state: show only the header bar */
  .wrap.collapsed { grid-template-rows: auto 0 0; width: 260px; }
  .wrap.collapsed .body, .wrap.collapsed .foot { display: none !important; }
  `]
})
export class ChatWidgetComponent {
  history: ChatMessage[] = [
    {
      role: 'bot',
      text: "Hi! I’m your **CareConnect** health information assistant.\nI can share general self-care tips and red-flag guidance.\nTap the option below to get started.",
      ts: Date.now()
    }
  ];
  quickReplies: QuickReply[] = [{ label: 'What can you do?', payload: 'help' }];

  typing = false;
  draft = '';
  collapsed = this.readCollapsed();

  constructor(private chat: ChatService) {}

  private push(role: Role, text: string): void {
    this.history = [...this.history, { role, text, ts: Date.now() }];
  }

  send(text?: string, starter = false): void {
    const msg = (text ?? this.draft).trim();
    if (!msg) return;
    this.push('user', msg);
    this.draft = '';
    this.typing = true;
    if (starter) this.quickReplies = [];
    this.chat.send(msg, starter).subscribe({
      next: (res) => { this.typing = false; this.push('bot', res?.text || '(no response)'); },
      error: (e) => {
        this.typing = false;
        const status = (e && typeof e.status !== 'undefined') ? e.status : 'n/a';
        const body = typeof e?.error === 'string' ? e.error : (e?.error ? JSON.stringify(e.error) : '');
        this.push('bot', `Chat error (status ${status}) ${body || e?.message || ''}`.trim());
      }
    });
  }

  toggle(): void { this.collapsed = !this.collapsed; this.writeCollapsed(this.collapsed); }

  private readCollapsed(): boolean {
    try { return localStorage.getItem('cc_chat_collapsed') === '1'; } catch { return false; }
  }
  private writeCollapsed(v: boolean): void {
    try { localStorage.setItem('cc_chat_collapsed', v ? '1' : '0'); } catch {}
  }
}
