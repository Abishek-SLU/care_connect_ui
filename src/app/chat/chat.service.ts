import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

export interface ChatRequest { message: string; starter?: boolean; }
export interface QuickReply { label: string; payload: string; }
export interface ChatResponse { text: string; quickReplies?: QuickReply[]; }

@Injectable({ providedIn: 'root' })
export class ChatService {
  constructor(private http: HttpClient) {}

  send(message: string, starter = false): Observable<ChatResponse> {
    const body: ChatRequest = { message, starter };
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<ChatResponse>('/api/chat', body, { headers }).pipe(
      tap(r => console.log('[chat] body', r)),
      catchError(err => { console.error('[chat] ERROR', err); return throwError(() => err); })
    );
  }
}