import {EventManager} from "azi-tools";

export type TokenManagerEventHandlerFunctionType = (token?: string) => void;
export type EventTypes = 'change';

const tokenName = 'token';

export class TokenManagerComponent {
    private _token ?: string | null;
    eventHandler = new EventManager<TokenManagerEventHandlerFunctionType, EventTypes>();


    get token() {
        if (this._token === undefined)
            try {
                this._token = localStorage.getItem(tokenName) || null;
            } catch (e) {
                console.error('token could not be read from localStorage');
            }

        return this._token || null;
    }

    set token(newToken: string | null) {
        if (newToken)
            localStorage.setItem(tokenName, newToken);
        else localStorage.removeItem(tokenName);

        this._token = newToken || null;
        this.eventHandler.trigger('change', newToken);
    }

    removeToken() {
        this.token = null;
    }
}