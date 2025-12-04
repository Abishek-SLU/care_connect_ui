import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ChatTokenService {
  private readonly KEY = 'access_token';

  get(): string | null {
    try { return localStorage.getItem(this.KEY); } catch { return null; }
  }
}