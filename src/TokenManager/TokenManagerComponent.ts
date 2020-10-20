import { EventManager } from "azi-tools";
import cookie from "react-cookies";

export type TokenManagerEventHandlerFunctionType = (token?: string) => void;
export type EventTypes = "change";

const tokenName = "token";

export class TokenManagerComponent {
  private _token?: string | null;
  events = new EventManager<TokenManagerEventHandlerFunctionType, EventTypes>();

  get token() {
    if (this._token === undefined)
      try {
        this._token = cookie.load(tokenName) || null;
      } catch (e) {
        console.error("token could not be read from Cookies");
      }

    return this._token || null;
  }

  set token(newToken: string | null) {
    if (newToken) cookie.save(tokenName, newToken, { path: "/" });
    else cookie.remove(tokenName, { path: "/" });

    this._token = newToken || null;
    this.events.trigger("change", newToken);
  }

  removeToken() {
    this.token = null;
  }
}
