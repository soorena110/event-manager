export type TokenManagerEventHandlerFunctionType = (token?: string) => void;
export type EventTypes = 'change';

export class TokenManagerEventHandler {
    private _eventHandlers: { [key: string]: TokenManagerEventHandlerFunctionType[]; } = {};

    public addEventListener(theEvent: EventTypes, theHandler: TokenManagerEventHandlerFunctionType) {
        this._eventHandlers[theEvent] = this._eventHandlers[theEvent] || [];
        this._eventHandlers[theEvent].push(theHandler);
    }

    removeEventListener(theEvent: EventTypes, theHandler: TokenManagerEventHandlerFunctionType) {
        const ix = this._eventHandlers[theEvent].indexOf(theHandler);
        if (ix != -1)
            this._eventHandlers[theEvent].splice(ix, 1);
        else console.warn(`[TokenManager] You are trying to unsubscribe from '${theEvent}',
         but the handler is not subscribed before`)
    }

    removeAllListeners(theEvent: EventTypes) {
        this._eventHandlers[theEvent] = [];
    }

    trigger(theEvent: EventTypes, token?: string) {
        const theHandlers = this._eventHandlers[theEvent];
        if (theHandlers) {
            for (let i = 0; i < theHandlers.length; i += 1) {
                theHandlers[i](token);
            }
        }
    }
}