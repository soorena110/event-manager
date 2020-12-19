export default class EventManager<TEventArgs, TEvent extends string = string, THandler = (e: TEventArgs) => void> {
  protected _eventHandlers: { [key: string]: THandler[]; } = {};
  public readonly name: string;

  constructor(name = '') {
    this.name = name;
  }

  public addEventListener(theEvent: TEvent, theHandler: THandler) {
    this._eventHandlers[theEvent] = this._eventHandlers[theEvent] || [];
    this._eventHandlers[theEvent].push(theHandler);
  }

  removeEventListener(theEvent: TEvent, theHandler: THandler) {
    const ix = this._eventHandlers[theEvent].indexOf(theHandler);
    if (ix != -1)
      this._eventHandlers[theEvent].splice(ix, 1);
    else console.warn(`[${this.name}] You are trying to unsubscribe from '${theEvent}',
         but the handler is not subscribed before`);
  }

  removeAllListeners(theEvent: TEvent) {
    this._eventHandlers[theEvent] = [];
  }

  trigger(theEvent: TEvent, args: TEventArgs) {
    const theHandlers = this._eventHandlers[theEvent];
    if (theHandlers) {
      for (let i = 0; i < theHandlers.length; i += 1) {
        EventManager.dispatchEvent(theHandlers[i], args);
      }
    }
  }

  private static dispatchEvent(theHandler: any, ...args: any) {
    theHandler(...args);
  }
}
