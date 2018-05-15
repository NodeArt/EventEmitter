declare class EventEmitter {
  readonly _events: Map<string, {fn: Function, times?: number, count?: number}>
  once(eventName: string, ...fns: Function[]): this
  times(eventName: string, times?: number, ...fns: Function[]): this
  on(eventName: string, ...fns: Function[]): this
  emit(eventName: string, ctx: any, ...args: any[]): this
  off(eventName: string, ...fns: Function[]): this
  offAll(): this
}
export = EventEmitter;
