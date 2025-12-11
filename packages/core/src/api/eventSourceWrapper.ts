
import { fetchEventSource, EventStreamContentType } from '@microsoft/fetch-event-source';

type EventSourceConfig = {
  url: string;
  headers?: Record<string, string>;
  body?: any;
  method?: string;
  openWhenHidden: boolean;
  credentials?: RequestCredentials;
};

interface EventSourceEvents<T = unknown> {
  onOpen?: (response: Response) => void | Promise<void>;
  onMessage: (data: T | null, event: MessageEvent) => void;
  onError?: (error: Error) => void;
  onClose?: () => void;
}

export class EventSourceService<T = unknown> {
  private abortController: AbortController;
  private isActive: boolean = false;

  constructor() {
    this.abortController = new AbortController();
  }

  public async connect(
    config: EventSourceConfig,
    handlers: EventSourceEvents<T>
  ): Promise<void> {
    this.isActive = true;
    
    try {
      await fetchEventSource(config.url, {
        method: config.method,
        headers: config.headers,
        body: JSON.stringify(config.body),
        credentials: config.credentials,
        signal: this.abortController.signal,
        openWhenHidden: config.openWhenHidden || false,
        async onopen(response) {
          if (!response.ok || 
              !response.headers.get('content-type')?.includes(EventStreamContentType)) {
            throw new Error(`Invalid SSE response: ${response.status}`);
          }
          await handlers.onOpen?.(response);
        },
        
        onmessage(event: any) {
          try {
            const data = event.data ? JSON.parse(event.data) as T : null;
            handlers.onMessage(data, event);
          } catch (err) {
            throw new Error(`Message parsing failed: ${(err as Error).message}`);
          }
        },
        
        onclose() {
          handlers.onClose?.();
        },
        
        onerror(err) {
          handlers.onError?.(err);
          throw err;
        }
      });
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        handlers.onError?.(err as Error);
      }
    } finally {
      this.isActive = false;
    }
  }

  public disconnect(): void {
    if (this.isActive) {
      this.abortController.abort();
      this.isActive = false;
    }
  }
}
