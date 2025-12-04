export type ChatMessageRole = 'user' | 'bot';

export interface ChatMessage {
  role: ChatMessageRole;
  text: string;
  ts?: number;
}

export interface QuickReply {
  label: string;
  payload: string;
}

export interface ChatRequest {
  message: string;
}

export interface ChatResponse {
  text: string;
  quickReplies?: QuickReply[];
}