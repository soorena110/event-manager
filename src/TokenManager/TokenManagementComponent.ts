import {EventTypes, TokenManagerEventHandler, TokenManagerEventHandlerFunctionType} from "./EventHandler";
import {withTokenChangeSubscription} from "./HOCSubscription";

const tokenName = 'token';

export default class TokenManagerComponent {
    private _token ?: string | null;
    private _eventHandler = new TokenManagerEventHandler();


    getToken() {
        if (!this._token)
            try {
                this._token = localStorage.getItem(tokenName);
            }
            catch (_a) {
            }

        return this._token;
    }

    setToken(newToken: string) {
        this._token = newToken;
        localStorage.setItem(tokenName, newToken);
        this._eventHandler.trigger('change', newToken)
    }

    removeToken() {
        if (this._token !== null)
            localStorage.removeItem(tokenName);

        this._token = undefined;
        this._eventHandler.trigger('change', undefined)
    }

    addEventListener(eventName: EventTypes, handler: TokenManagerEventHandlerFunctionType) {
        this._eventHandler.addEventListener(eventName, handler)
    }

    withSubscription = withTokenChangeSubscription
}