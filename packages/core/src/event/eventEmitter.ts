
type EventHandler = (...args: any[]) => void;

export class EventEmitter {
  private events: Map<string, EventHandler[]> = new Map();

  on(eventName: string, handler: EventHandler): void {
    const handlers = this.events.get(eventName) || [];
    handlers.push(handler);
    this.events.set(eventName, handlers);
  }

  off(eventName: string, handler?: EventHandler): void {
    if (!handler) {
      this.events.delete(eventName);
      return;
    }
    
    const handlers = this.events.get(eventName);
    if (handlers) {
      const index = handlers.indexOf(handler);
      if (index > -1) {
        handlers.splice(index, 1);
      }
    }
  }

  emit(eventName: string, ...args: any[]): void {
    const handlers = this.events.get(eventName);
    if (handlers) {
      handlers.forEach(handler => handler(...args));
    }
  }

  once(eventName: string, handler: EventHandler): void {
    const wrapper = (...args: any[]) => {
      handler(...args);
      this.off(eventName, wrapper);
    };
    this.on(eventName, wrapper);
  }
}

// export default EventEmitter;
