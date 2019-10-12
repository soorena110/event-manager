export type ModeManagementEventHandler = (newValue: string) => void;

export class ModeManagementEventManager {
    private _eventHandlers: { [key: string]: ModeManagementEventHandler[]; } = {};

    public addEventListener(theEvent: string, theHandler: ModeManagementEventHandler) {
        this._eventHandlers[theEvent] = this._eventHandlers[theEvent] || [];
        this._eventHandlers[theEvent].push(theHandler);
    }

    removeEventListener(theEvent: string, theHandler: ModeManagementEventHandler) {
        const ix = this._eventHandlers[theEvent].indexOf(theHandler);
        if (ix != -1)
            this._eventHandlers[theEvent].splice(ix, 1);
        else console.warn(`[ModeManagement] You are trying to unsubscribe from '${theEvent}',
         but the handler is not subscribed before`)
    }

    removeAllEventListeners(theEvent: string) {
        this._eventHandlers[theEvent] = [];
    }

    trigger(theEvent: string, ...args: any) {
        const theHandlers = this._eventHandlers[theEvent];
        if (theHandlers) {
            for (let i = 0; i < theHandlers.length; i += 1) {
                this.dispatchEvent(theHandlers[i], ...args);
            }
        }
    }

    private dispatchEvent(theHandler: any, ...args: any) {
        theHandler(...args);
    }
}