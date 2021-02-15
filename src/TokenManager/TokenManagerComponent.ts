import { EventManager } from "azi-tools";
import cookie from "react-cookies";

export type TokenManagerEventHandlerFunctionType = (token?: string) => void;
export type EventTypes = "change";

const tokenName = "token";
const storageName = "wt-storage";

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
    const storage = cookie.load(storageName) || "cookie";
    if (newToken) {
      switch (storage) {
        case "cookie":
          cookie.save(tokenName, newToken, { path: "/" });
          break;
        case "sessionStorage":
          sessionStorage.setItem(tokenName, newToken);
          break;
        case "localStorage":
          localStorage.setItem(tokenName, newToken);
          break;
        default:
          break;
      }
    } else {
      switch (storage) {
        case "cookie":
          cookie.remove(tokenName, { path: "/" });
          break;
        case "sessionStorage":
          sessionStorage.removeItem(tokenName);
          break;
        case "localStorage":
          localStorage.removeItem(tokenName);
          break;
        default:
          break;
      }
    }

    this._token = newToken || null;
    this.events.trigger("change", newToken);
  }

  set storage(theStorage: "cookie" | "sessionStorage" | "localStorage" | null) {
    if (theStorage) cookie.save(storageName, theStorage, { path: "/" });
    else cookie.remove(storageName, { path: "/" });
  }
  removeToken() {
    this.token = null;
    this.storage = null;
  }
}
