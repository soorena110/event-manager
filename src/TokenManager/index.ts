import {TokenManagerComponent} from "./TokenManagerComponent";

const TokenManager = new TokenManagerComponent();
export default TokenManager;
export const connectToTokenChange = TokenManager.eventHandler.connectToEvent;

(window as any).$tokenManager = TokenManager;