export type Message = {
  role: 'user' | 'system' | 'assistant';
  content: string;
};

export type State = {
  messages: Array<Message>,
  systemMessage: Message,
  prompt: string,
  isLoading: boolean,
  error: string | null,
};

export type Action = {
  type: 'PROMPT_UPDATED',
  payload: string
} | {
  type: 'ERROR_OCCURRED',
  payload: string
} | {
  type: 'MESSAGE_SENT',
  payload: Message
} | {
  type: 'MESSAGE_RECEIVED',
  payload: Message
} | {
  type: 'ERROR_OCCURRED',
  payload: string
}

