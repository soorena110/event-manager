import {TokenManagerComponent} from "./TokenManagerComponent";

const TokenManager = new TokenManagerComponent();
export default TokenManager;
export const connectToTokenChange = TokenManager.events.connectToEvent('change');

(window as any).$tokenManager = TokenManager;