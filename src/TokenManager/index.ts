import {TokenManagerComponent} from "./TokenManagerComponent";

const TokenManager = new TokenManagerComponent();
export default TokenManager;

(window as any).$tokenManager = TokenManager;