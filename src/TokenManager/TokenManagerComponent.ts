import {EventManager} from "azi-tools";

export type TokenManagerEventHandlerFunctionType = (token?: string) => void;
export type EventTypes = 'change';

const tokenName = 'token';

export class TokenManagerComponent {
    private _token ?: string | null;
    private _eventHandler = new EventManager();


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

    addEventListener = this._eventHandler.addEventListener;
    removeEventListener = this._eventHandler.removeEventListener;
    removeAllListeners = this._eventHandler.removeAllListeners;
}